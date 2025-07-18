import express, { Router } from "express";
import { storyviewController } from "../controllers/storyview";
import { storyViewValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post(
	"/storyView",
	[...storyViewValidator()],
	storyviewController.createStoryView
);
router.get("/storyView/:id", storyviewController.detailStoryView);

export default router;
