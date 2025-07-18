// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const updateComment = async (req: Request, res: Response) => {
	try {
		// get all posts from database
		const { id } = req.params;
		const posts = await prisma.comment.update({
			where: {
				id: id,
			},
			data: {
				text: req.body.text,
				userId: req.body.content,
				postId: req.body.imageUrl,
			},
		});

		// send response
		res.status(200).send({
			success: true,
			metode: req.method,
			message: "Update Comment Successfully",
			data: posts,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			metode: req.method,
			message: "Internal server error",
		});
	}
};
