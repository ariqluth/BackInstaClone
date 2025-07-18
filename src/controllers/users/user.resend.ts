import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";
import { ClientResponse } from "@sendgrid/client/src/response";
import { tempMailResend } from "../../templates/template.resend";
import { signAccessToken } from "../../utils/util.jwt";
import { IResendMail } from "../../interface/interface.templatemail";
import { IJwt } from "../../interface/interface.jwt";
import { expressValidator } from "../../utils/util.validator";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const resend = async (
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

	if (findUser.active === true) {
		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "User account hash been active, please login",
		});
	}

	const { id, email, username }: User = findUser;
	const { accessToken }: IJwt = signAccessToken()(
		req,
		res,
		{ user_id: id, email: email, username: username },
		{ expiresIn: "5m" }
	);
	const template: IResendMail = tempMailResend(email, accessToken);

	const sgResponse: [ClientResponse, any] = await sgMail.send(template);
	if (!sgResponse) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Server error failed to sending email activation",
		});
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: `resend new token activation successfully, please check your email ${email}`,
	});
};
