// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const resultPost = async (req: Request, res: Response) => {
	try {
		// get all posts from database
		const posts = await prisma.post.findMany({
			select: {
				id: true,
				content: true,
				imageUrl: true,
				createdAt: true,
				updatedAt: true,
				authorId: true,
				likes: true,
				comments: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		// send response
		res.status(200).send({
			success: true,
			method: req.method,
			message: "Get all results Post successfully",
			data: posts,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			method: req.method,
			message: "Internal server error",
		});
	}
};
