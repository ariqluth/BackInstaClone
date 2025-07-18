import { Request, Response } from "express";
import transporter from "../../utils/util.mailer";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/util.encrypt";
import { signAccessToken } from "../../utils/util.jwt";
import { tempMailRegister } from "../../templates/template.register";
import { IJwt } from "../../interface/interface.jwt";
import { expressValidator } from "../../utils/util.validator";
import { IRegisterMail } from "../../interface/interface.templatemail";

const prisma = new PrismaClient();

export const register = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const errors = expressValidator(req);
		if (errors.length > 0) {
			return res.status(400).json({
				success: false,
				message: "Validation errors",
				errors: errors,
			});
		}

		const { email, username, password, name } = req.body;

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: email }, { username: username }],
			},
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message:
					existingUser.email === email
						? "Email already registered"
						: "Username already taken",
			});
		}

		const hashedPassword = hashPassword(password);

		const newUser = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
				name,
			},
			select: {
				id: true,
				email: true,
				username: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		const payload = {
			user_id: newUser.id,
			email: newUser.email,
			username: newUser.username,
		};

		const tokens: IJwt = signAccessToken()(req, res, payload, {
			expiresIn: "1d",
		});

		const userResponse = {
			id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			name: newUser.name,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
		};
		const template: IRegisterMail = tempMailRegister(email, tokens.accessToken);

		try {
			await transporter.sendMail({
				from: process.env.MAIL_USERNAME,
				to: template.to,
				subject: template.subject,
				html: template.html,
			});

			return res.status(201).json({
				success: true,
				message:
					"User registered successfully. Please check your email to activate your account.",
				data: {
					user: userResponse,
					token: tokens.accessToken,
				},
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				status: res.statusCode,
				method: req.method,
				message: "Server error failed to sending email activation",
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			status: res.statusCode,
			method: req.method,
			message: "Internal server error",
		});
	}
};
