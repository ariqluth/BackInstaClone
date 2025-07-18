import { createComment } from "./comment.create";
import { resultComment } from "./comment.results";
import { detailComment } from "./comment.detail";
import { deleteComment } from "./comment.delete";
import { updateComment } from "./comment.update";

export const commentController = {
	createComment,
	resultComment,
	detailComment,
	deleteComment,
	updateComment,
};
