import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import transporter from "../../utils/util.mailer";
import { tempMailReset } from "../../templates/template.reset";
import { signAccessToken } from "../../utils/util.jwt";
import { expressValidator } from "../../utils/util.validator";
import { IResetMail } from "../../interface/interface.templatemail";
import { IJwt } from "../../interface/interface.jwt";

const prisma = new PrismaClient();
export const forgot = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	const errors = expressValidator(req);

	if (errors.length > 0) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			errors,
		});
	}

	const findUser = await prisma.user.findUnique({
		where: {
			email: req.body.email,
		},
	});

	if (!findUser) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: "User account for this email is not exitst, please register",
		});
	}

	if (findUser.active === false) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: "user account is not active, please resend new activation token",
		});
	}

	const { id, email, username } = findUser;
	const { accessToken }: IJwt = signAccessToken()(
		req,
		res,
		{ user_id: id, email: email, username: username },
		{ expiresIn: "1d" }
	);
	const template: IResetMail = tempMailReset(email, accessToken);

	try {
		await transporter.sendMail({
			from: process.env.MAIL_USERNAME,
			to: template.to,
			subject: template.subject,
			html: template.html,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Server error failed to sending email reset password",
		});
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: `forgot password successfuly, please check your email ${email}`,
	});
};
