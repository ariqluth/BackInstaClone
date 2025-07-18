// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const detailStoryView = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// get all posts from database
		const posts = await prisma.storyView.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				storyId: true,
				userId: true,
				createdAt: true,
			},
		});

		// send response
		res.status(200).send({
			success: true,
			message: "Detail Story View Successfully",
			data: posts,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Internal server error",
		});
	}
};
