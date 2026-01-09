import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verifications = pgTable(
	"verifications",
	{
		// id: text()
		//   .primaryKey()
		//   .$defaultFn(() => randomUUIDv7()),
		id: text().default(sql`uuidv7()`).primaryKey(),

		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),

		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("verifications_identifier_idx").on(table.identifier)],
);
