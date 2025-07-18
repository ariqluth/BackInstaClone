import { User, Post, Like, Story, StoryView, Comment } from "@prisma/client";

// User DTOs
export interface UserCreateDTO {
	email: string;
	username: string;
	password: string;
	name?: string;
}

export interface UserUpdateDTO {
	email?: string;
	username?: string;
	password?: string;
	name?: string;
}

export interface UserResponseDTO {
	id: string;
	email: string;
	username: string;
	name?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Post DTOs
export interface PostCreateDTO {
	content?: string;
	imageUrl?: string;
	authorId: string;
}

export interface PostUpdateDTO {
	content?: string;
	imageUrl?: string;
}

export interface PostResponseDTO {
	id: string;
	content?: string;
	imageUrl?: string;
	createdAt: Date;
	updatedAt: Date;
	authorId: string;
	author?: UserResponseDTO;
	likes?: LikeResponseDTO[];
	comments?: CommentResponseDTO[];
}

// Like DTOs
export interface LikeCreateDTO {
	userId: string;
	postId: string;
}

export interface LikeResponseDTO {
	id: string;
	createdAt: Date;
	userId: string;
	postId: string;
	user?: UserResponseDTO;
}

// Story DTOs
export interface StoryCreateDTO {
	imageUrl?: string;
	userId: string;
}

export interface StoryUpdateDTO {
	imageUrl?: string;
}

export interface StoryResponseDTO {
	id: string;
	imageUrl?: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	user?: UserResponseDTO;
	views?: StoryViewResponseDTO[];
}

// StoryView DTOs
export interface StoryViewCreateDTO {
	userId: string;
	storyId: string;
}

export interface StoryViewResponseDTO {
	id: string;
	createdAt: Date;
	userId: string;
	storyId: string;
	user?: UserResponseDTO;
}

// Comment DTOs
export interface CommentCreateDTO {
	text: string;
	userId: string;
	postId: string;
}

export interface CommentUpdateDTO {
	text?: string;
}

export interface CommentResponseDTO {
	id: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	postId: string;
	user?: UserResponseDTO;
}

// JWT Payload
export interface JWTPayload {
	user_id: string;
	email: string;
	username: string;
}

// Prisma generated types dapat langsung digunakan
export type PrismaUser = User;
export type PrismaPost = Post;
export type PrismaLike = Like;
export type PrismaStory = Story;
export type PrismaStoryView = StoryView;
export type PrismaComment = Comment;
