import express, { Router } from "express";
import { storyController } from "../controllers/story";
import { storyValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post("/story", [...storyValidator()], storyController.createStory);
router.get("/story", storyController.resultStory);
router.get("/story/:id", storyController.detailStory);
router.delete("/story/:id", storyController.deleteStory);
router.put("/story/:id", storyController.updateStory);

export default router;
