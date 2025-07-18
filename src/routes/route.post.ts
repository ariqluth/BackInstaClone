import express, { Router } from "express";
import { postController } from "../controllers/post";
import { fileUpload } from "../utils/util.upload";
import { postValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post(
	"/post",
	[...postValidator(), fileUpload.fields([{ name: "imageUrl" }])],
	postController.createPost
);
router.get("/post", postController.resultPost);
router.delete("/post/:id", postController.deletePost);
router.put("/post/:id", postController.updatePost);

export default router;
