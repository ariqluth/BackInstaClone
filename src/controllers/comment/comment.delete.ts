// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const deleteComment = async (req: Request, res: Response) => {
	try {
		// get all posts from database
		const { id } = req.params;
		const likes = await prisma.comment.delete({
			where: {
				id: id,
			},
		});

		// send response
		res.status(200).send({
			success: true,
			metode: req.method,
			message: `Comment Deleted Successfully :${id}`,
			data: likes,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			metode: req.method,
			message: "Internal server error",
		});
	}
};
