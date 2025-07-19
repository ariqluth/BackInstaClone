import { Request, Response } from "express";

export const logout = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		// Clear the refresh token cookie
		res.clearCookie("refreshToken", {
			httpOnly: true,
		});

		return res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		console.error("Logout error:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			detail: error.message,
		});
	}
};
