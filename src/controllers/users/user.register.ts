import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/util.encrypt";
import { signAccessToken } from "../../utils/util.jwt";
import { IJwt } from "../../interface/interface.jwt";
import { expressValidator } from "../../utils/util.validator";

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

		return res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: {
				user: userResponse,
				accessToken: tokens.accessToken,
			},
		});
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
