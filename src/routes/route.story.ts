import express, { Router } from "express";
import { storyController } from "../controllers/story";
import { fileUpload } from "../utils/util.upload";
import { storyValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post(
	"/story",
	[...storyValidator(), fileUpload.fields([{ name: "imageUrl" }])],
	storyController.createStory
);
router.get("/story", storyController.resultStory);
router.get("/story/:id", storyController.detailStory);
router.delete("/story/:id", storyController.deleteStory);
router.put("/story/:id", storyController.updateStory);

export default router;
