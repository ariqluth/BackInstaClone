import { Application, Request, Response } from "express";
import userRoute from "../routes/route.user";
import postRoute from "../routes/route.post";
import likeRoute from "../routes/route.refresh";
import storyRoute from "../routes/route.story";
import commentRoute from "../routes/route.comment";

export const routeMiddleware = (app: Application): void => {
	app.use("/api/v1", userRoute);
	app.use("/api/v1", postRoute);
	app.use("/api/v1", likeRoute);
	app.use("/api/v1", storyRoute);
	app.use("/api/v1", commentRoute);
	app.get(
		"/",
		(req: Request, res: Response): Response<any> => {
			return res.send("<h1>Welcome To Instagram Backend</h1>");
		}
	);
};
