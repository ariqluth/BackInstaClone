// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const detailLike = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// get all posts from database
		const posts = await prisma.like.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				userId: true,
				postId: true,
				createdAt: true,
			},
		});

		// send response
		res.status(200).send({
			success: true,
			message: "Detail Like Successfully",
			data: posts,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Internal server error",
		});
	}
};
