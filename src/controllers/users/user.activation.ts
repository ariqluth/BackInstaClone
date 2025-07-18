import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verifySignAccessToken } from "../../utils/util.jwt";

const prisma = new PrismaClient();
export const activation = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const { email } = verifySignAccessToken()(req, res, req.params.token);
		const findUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (findUser?.active === true) {
			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "user account hash been active, please login",
			});
		}

		const updateActive = await prisma.user.update({
			where: {
				email: email,
			},
			data: {
				active: true,
			},
		});
		if (!updateActive) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "activation account failed, please try again",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "activation account successfuly, please login",
		});
	} catch (err) {
		return res.status(401).json({
			status: res.statusCode,
			method: req.method,
			message: "access token expired, please resend new activation token",
		});
	}
};
