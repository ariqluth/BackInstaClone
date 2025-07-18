import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { signAccessToken } from "../../utils/util.jwt";
import { verifyPassword } from "../../utils/util.encrypt";
import { expressValidator } from "../../utils/util.validator";
import { JWTPayload, UserResponseDTO } from "../../dto/dto.prisma";

const prisma = new PrismaClient();

export const login = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		// validate input
		const errors = expressValidator(req);
		if (errors.length > 0) {
			return res.status(400).json({
				success: false,
				message: "Validation errors",
				errors: errors,
			});
		}

		const { email, password } = req.body;

		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				username: true,
				password: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		return new Promise((resolve) => {
			verifyPassword(password, user.password, (err: any, isMatch: boolean) => {
				if (err) {
					return resolve(
						res.status(500).json({
							success: false,
							message: "Internal server error",
						})
					);
				}

				if (!isMatch) {
					return resolve(
						res.status(401).json({
							success: false,
							message: "Invalid email or password",
						})
					);
				}

				const payload: JWTPayload = {
					user_id: user.id,
					email: user.email,
					username: user.username,
				};

				const tokens = signAccessToken()(req, res, payload, {
					expiresIn: "1d",
				});

				// Create user response DTO
				const userResponse: UserResponseDTO = {
					id: user.id,
					email: user.email,
					username: user.username,
					name: user.name,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				};

				return resolve(
					res.status(200).json({
						success: true,
						message: "Login successful",
						data: {
							user: userResponse,
							accessToken: tokens.accessToken,
						},
					})
				);
			});
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
