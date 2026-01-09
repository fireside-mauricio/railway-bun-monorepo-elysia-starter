import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

import { invitations } from "./invitations";
import { members } from "./members";

export const organizations = pgTable(
	"organizations",
	{
		// id: text()
		//   .primaryKey()
		//   .$defaultFn(() => randomUUIDv7()),
		id: text().default(sql`uuidv7()`).primaryKey(),

		name: text("name").notNull(),
		slug: text("slug").notNull().unique(),
		logo: text("logo"),
		metadata: text("metadata"),

		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [uniqueIndex("organizations_slug_uidx").on(table.slug)],
);

export const organizationsRelations = relations(organizations, ({ many }) => ({
	members: many(members),
	invitations: many(invitations),
}));
