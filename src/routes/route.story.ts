import express, { Router } from "express";
import { Story } from "../controllers/story";
import { storyValidator } from "../utils/util.validator";
import { roleJwt } from "../middlewares/middleware.role";
const router: Router = express.Router();

router.post(
	"/story",
	[roleJwt(), ...storyValidator()],
	reportController.createComment
);
router.get("/story", [roleJwt()], reportController.resultsReport);
router.get("/story/:id", [roleJwt()], reportController.detailReport);
router.delete("/story/:id", [roleJwt()], reportController.deleteReport);
router.put("/story/:id", [roleJwt()], reportController.updateReport);

export default router;
