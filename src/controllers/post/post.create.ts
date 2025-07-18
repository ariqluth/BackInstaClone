// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const createPost = async (req: Request, res: Response) => {
	try {
		const imageFile = req.files ? (req.files as any).imageUrl?.[0] : null;

		const imageUrl = imageFile ? `/images/${imageFile.filename}` : null;
		// get all posts from database
		const posts = await prisma.post.create({
			data: {
				content: req.body.content,
				imageUrl: imageUrl,
				authorId: req.body.authorId,
			},
		});

		// send response
		res.status(201).send({
			success: true,
			method: req.method,
			message: "Posts Created Successfully",
			data: posts,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			method: req.method,
			message: "Internal server error ",
			detail: error.message,
		});
	}
};
