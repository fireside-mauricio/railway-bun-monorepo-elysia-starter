import { relations, sql } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organizations } from "./organizations";
import { users } from "./users";

export const invitations = pgTable(
	"invitations",
	{
		// id: text()
		//   .primaryKey()
		//   .$defaultFn(() => randomUUIDv7()),
		id: text().default(sql`uuidv7()`).primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		inviterId: text("inviter_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		email: text("email").notNull(),
		role: text("role"),
		status: text("status").default("pending").notNull(),
		expiresAt: timestamp("expires_at").notNull(),

		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("invitations_organizationId_idx").on(table.organizationId),
		index("invitations_email_idx").on(table.email),
	],
);

export const invitationsRelations = relations(invitations, ({ one }) => ({
	organizations: one(organizations, {
		fields: [invitations.organizationId],
		references: [organizations.id],
	}),
	users: one(users, {
		fields: [invitations.inviterId],
		references: [users.id],
	}),
}));
