declare module "bun" {
	interface Env {
		PORT: string;
		FRONTEND_URL: string;

		NODE_ENV: "development" | "production" | "test";

		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;

		DATABASE_URL: string;
		REDIS_URL: string;
	}
}
