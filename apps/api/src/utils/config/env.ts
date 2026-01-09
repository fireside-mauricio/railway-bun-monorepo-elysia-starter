import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().min(1, "PORT is required").default("3000"),
	FRONTEND_URL: z
		.url()
		.min(1, "FRONTEND_URL is required")
		.default("http://localhost:5173"),
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
	BETTER_AUTH_URL: z.url().min(1, "BETTER_AUTH_URL is required"),
	DATABASE_URL: z
		.url()
		.min(1, "DATABASE_URL is required")
		.startsWith("postgresql://")
		.default("postgresql://postgres:postgres@localhost:5432/postgres"),
	REDIS_URL: z
		.url()
		.min(1, "REDIS_URL is required")
		.startsWith("redis://")
		.default("redis://localhost:6379"),
});

export const env = envSchema.parse(Bun.env);
