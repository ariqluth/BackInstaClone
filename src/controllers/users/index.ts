import { register } from "./user.register";
import { login } from "./user.login";
import { activation } from "./user.activation";
import { resend } from "./user.resend";
import { forgot } from "./user.forgot";
import { reset } from "./user.reset";
import { logout } from "./user.logout";

export const userController = {
	register,
	login,
	activation,
	resend,
	forgot,
	reset,
	logout,
};
