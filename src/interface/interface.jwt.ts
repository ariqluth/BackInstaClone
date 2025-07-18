export interface IJwt {
	accessToken: string;
	refreshToken: string;
}

export interface IJwtPayload {
	user_id: string;
	email: string;
	username: string;
	iat?: number;
	exp?: number;
}

export interface IJwtDecoded {
	user_id: string;
	email: string;
	username: string;
	iat: number;
	exp: number;
}
