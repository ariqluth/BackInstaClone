import express, { Router } from "express";
import { storyController } from "../controllers/story";
import { storyValidator } from "../utils/util.validator";
import { roleJwt } from "../middlewares/middleware.role";
const router: Router = express.Router();

router.post(
	"/story",
	[roleJwt(), ...storyValidator()],
	storyController.createStory
);
router.get("/story", [roleJwt()], storyController.resultStory);
router.get("/story/:id", [roleJwt()], storyController.detailStory);
router.delete("/story/:id", [roleJwt()], storyController.deleteStory);
router.put("/story/:id", [roleJwt()], storyController.updateStory);

export default router;
