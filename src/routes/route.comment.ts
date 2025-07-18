import express, { Router } from "express";
import { commentController } from "../controllers/comment";
import { commentValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post(
	"/request",
	[...commentValidator()],
	commentController.createComment
);
router.get("/request", commentController.resultComment);
router.get("/request/:id", commentController.detailComment);
router.delete("/request/:id", commentController.deleteComment);
router.put("/request/:id", commentController.updateComment);

export default router;
