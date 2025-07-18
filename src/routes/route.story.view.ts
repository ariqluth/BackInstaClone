import express, { Router } from "express";
import { reportController } from "../controllers/comment";
import { storyViewValidator } from "../utils/util.validator";
import { roleJwt } from "../middlewares/middleware.role";
const router: Router = express.Router();

router.post(
	"/story",
	[roleJwt(), ...storyViewValidator()],
	reportController.createReport
);
router.get("/storyView", [roleJwt()], reportController.resultsReport);
router.get("/storyView/:id", [roleJwt()], reportController.detailReport);
router.delete("/storyView/:id", [roleJwt()], reportController.deleteReport);
router.put("/storyView/:id", [roleJwt()], reportController.updateReport);

export default router;
