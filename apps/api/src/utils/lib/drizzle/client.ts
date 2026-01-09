import { drizzle } from "drizzle-orm/node-postgres";

import { schema } from "@/utils/lib/drizzle/schema";
import { env } from "../../config/env";

export const db = drizzle(env.DATABASE_URL, {
	logger: env.NODE_ENV === "development",
	schema,
	casing: "snake_case",
});
