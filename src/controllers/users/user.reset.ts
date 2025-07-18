import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { verifySignAccessToken } from "../../utils/util.jwt";
import { expressValidator } from "../../utils/util.validator";
import { hashPassword as encodePassword } from "../../utils/util.encrypt";

const prisma = new PrismaClient();
export const reset = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const errors = expressValidator(req);

		if (errors.length > 0) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				errors,
			});
		}

		const { email }: User = verifySignAccessToken()(req, res, req.params.token);
		const findUser: User = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!findUser) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "user account is not exist, please register",
			});
		}

		const hashPassword: string = encodePassword(req.body.password);
		const updatePassword = await prisma.user.update({
			where: {
				email: email,
			},
			data: {
				password: hashPassword,
			},
		});

		if (!updatePassword) {
			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "update password failed, please try again",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "update password successfully, please login",
		});
	} catch (err) {
		return res.status(401).json({
			status: res.statusCode,
			method: req.method,
			message: "access token expired, please try forgot password again",
		});
	}
};
