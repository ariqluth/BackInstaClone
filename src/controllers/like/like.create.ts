// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const createLike = async (req: Request, res: Response) => {
	try {
		// get all posts from database
		const likes = await prisma.like.create({
			data: {
				userId: req.body.userId,
				postId: req.body.postId,
			},
		});

		// send response
		res.status(201).send({
			success: true,
			method: req.method,
			message: "Like Created Successfully",
			data: likes,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			method: req.method,
			message: "Internal server error",
		});
	}
};
