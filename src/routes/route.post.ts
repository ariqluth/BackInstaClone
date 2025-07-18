import express, { Router } from "express";
import { postController } from "../controllers/post";
import { roleJwt } from "../middlewares/middleware.role";
import { postValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post(
	"/post",
	[roleJwt(), ...postValidator()],
	postController.createPost
);
router.get("/post", [roleJwt()], postController.resultPost);
router.delete("/post/:id", [roleJwt()], postController.deletePost);
router.put("/post/:id", [roleJwt()], postController.updatePost);

export default router;
