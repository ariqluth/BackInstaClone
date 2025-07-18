import { Request } from "express";
import {
	check,
	validationResult,
	ValidationError,
	ValidationChain,
	Result,
} from "express-validator";

export const expressValidator = (req: Request): ValidationError[] => {
	const errors: Result<ValidationError> = validationResult(req);

	const messages: ValidationError[] = [];
	if (!errors.isEmpty()) {
		for (const i of errors.array()) {
			messages.push(i);
		}
	}
	return messages;
};

export const paramsValiator = (): ValidationChain[] => [
	check("id").notEmpty().withMessage("id is required"),
	check("id").isNumeric().withMessage("id must be number"),
];

export const registerValidator = (): ValidationChain[] => [
	check("email").notEmpty().withMessage("email is required"),
	check("email").isEmail().withMessage("email is not valid"),
	check("password").notEmpty().withMessage("password is required"),
	check("password")
		.isLength({ min: 8 })
		.withMessage("password must be at least 8 characters"),
];

export const loginValidator = (): ValidationChain[] => [
	check("email").notEmpty().withMessage("email is required"),
	check("email").isEmail().withMessage("email is not valid"),
	check("password").notEmpty().withMessage("pasword is required"),
];

export const emailValidator = (): ValidationChain[] => [
	check("email").notEmpty().withMessage("email is required"),
	check("email").isEmail().withMessage("email is not valid"),
];

export const tokenValidator = (): ValidationChain[] => [
	check("token").notEmpty().withMessage("token is required"),
	check("token").isJWT().withMessage("token is not valid"),
];

export const postValidator = (): ValidationChain[] => [
	check("content")
		.optional()
		.isString()
		.withMessage("content must be a string"),
	check("imageUrl")
		.optional()
		.isURL()
		.withMessage("imageUrl must be a valid URL"),
	check("authorId").notEmpty().withMessage("authorId is required"),
	check("authorId").isString().withMessage("authorId must be a string"),
];

export const likeValidator = (): ValidationChain[] => [
	check("userId").notEmpty().withMessage("userId is required"),
	check("userId").isString().withMessage("userId must be a string"),
	check("postId").notEmpty().withMessage("postId is required"),
	check("postId").isString().withMessage("postId must be a string"),
];

export const storyValidator = (): ValidationChain[] => [
	check("imageUrl")
		.optional()
		.isURL()
		.withMessage("imageUrl must be a valid URL"),
	check("userId").notEmpty().withMessage("userId is required"),
	check("userId").isString().withMessage("userId must be a string"),
];

export const storyViewValidator = (): ValidationChain[] => [
	check("userId").notEmpty().withMessage("userId is required"),
	check("userId").isString().withMessage("userId must be a string"),
	check("storyId").notEmpty().withMessage("storyId is required"),
	check("storyId").isString().withMessage("storyId must be a string"),
];

export const commentValidator = (): ValidationChain[] => [
	check("text").notEmpty().withMessage("text is required"),
	check("text").isString().withMessage("text must be a string"),
	check("userId").notEmpty().withMessage("userId is required"),
	check("userId").isString().withMessage("userId must be a string"),
	check("postId").notEmpty().withMessage("postId is required"),
	check("postId").isString().withMessage("postId must be a string"),
];
