// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const updatePost = async (req: Request, res: Response) => {
	try {
		// get all posts from database
		const { id } = req.params;
		const imageFile = req.files ? (req.files as any).imageUrl?.[0] : null;

		const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : null;
		const posts = await prisma.post.update({
			where: {
				id: id,
			},
			data: {
				content: req.body.content,
				imageUrl: imageUrl,
				authorId: req.body.authorId,
			},
		});

		// send response
		res.status(200).send({
			success: true,
			metode: req.method,
			message: "Update Post Successfully",
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
