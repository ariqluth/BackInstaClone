import express, { Router } from "express";
import { storyviewController } from "../controllers/storyview";
import { storyViewValidator } from "../utils/util.validator";
import { roleJwt } from "../middlewares/middleware.role";
const router: Router = express.Router();

router.post(
	"/storyView",
	[roleJwt(), ...storyViewValidator()],
	storyviewController.createStoryView
);
router.get("/storyView/:id", [roleJwt()], storyviewController.detailStoryView);

export default router;
