// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const detailPost = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// get all posts from database
		const posts = await prisma.post.findUnique({
			where: {
				id: id,
			},
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
		});

		// send response
		res.status(200).send({
			success: true,
			message: "Detail Posts Successfully",
			data: posts,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Internal server error",
		});
	}
};
