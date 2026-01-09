import { relations, sql } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organizations } from "./organizations";
import { users } from "./users";

export const members = pgTable(
	"members",
	{
		// id: text()
		//   .primaryKey()
		//   .$defaultFn(() => randomUUIDv7()),
		id: text().default(sql`uuidv7()`).primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		role: text("role").default("member").notNull(),

		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("members_organizationId_idx").on(table.organizationId),
		index("members_userId_idx").on(table.userId),
	],
);

export const membersRelations = relations(members, ({ one }) => ({
	organizations: one(organizations, {
		fields: [members.organizationId],
		references: [organizations.id],
	}),
	users: one(users, {
		fields: [members.userId],
		references: [users.id],
	}),
}));
