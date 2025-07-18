import express, { Router } from "express";
import { PostController } from "../controllers/post";
import { roleJwt } from "../middlewares/middleware.role";
import { postValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post(
	"/post",
	[roleJwt(), ...postValidator()],
	PostController.createPost
);
router.get("/post", [roleJwt()], PostController.resultPost);
router.delete("/post/:id", [roleJwt()], PostController.deletePost);
router.put("/post/:id", [roleJwt()], PostController.updatePost);

export default router;
