import { Request, Express } from "express";
import multer, { StorageEngine, Multer } from "multer";
import { resolve } from "path";
import { existsSync, unlink } from "fs";

const diskStorage: StorageEngine = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, done): void => {
		if (!file) return done(new Error("Upload file error"), null);

		const fileExits = existsSync(
			resolve(process.cwd(), `public/uploads/${file.originalname}`)
		);
		if (!fileExits) return done(null, resolve(process.cwd(), "public/uploads"));

		unlink(
			resolve(process.cwd(), `public/uploads/${file.originalname}`),
			(error: any): void => {
				if (error) return done(error, null);
				return done(null, resolve(process.cwd(), "public/uploads"));
			}
		);
	},
	filename: (req: any, file: Express.Multer.File, done): void => {
		if (file) {
			const extFile = file.originalname.replace(".", "");
			const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(extFile);
			if (!extPattern)
				return done(new TypeError("File format is not valid"), null);
			req.photo = file.originalname;
			return done(null, file.originalname);
		}
	},
});

export const fileUpload: Multer = multer({
	storage: diskStorage,
	limits: { fileSize: 1000000 },
});
