import express, { Router } from "express";
import { likeController } from "../controllers/like";
import { likeValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post("/like", [...likeValidator()], likeController.createLike);
router.get("/like", likeController.resultPost);
router.get("/like/:id", likeController.detailLike);
router.delete("/like/:id", likeController.deleteLike);

export default router;
