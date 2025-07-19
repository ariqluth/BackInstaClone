// import PrismaClient
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// init prisma client
const prisma = new PrismaClient();

// function findPosts
export const createStoryView = async (req: Request, res: Response) => {
	try {
		// get all posts from database
		const storys = await prisma.storyView.create({
			data: {
				storyId: req.body.storyId,
				userId: req.body.userId,
			},
		});

		// send response
		res.status(201).send({
			success: true,
			method: req.method,
			message: "Story View Created Successfully",
			data: storys,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			method: req.method,
			message: "Internal server error",
			detail: error.message,
		});
	}
};
