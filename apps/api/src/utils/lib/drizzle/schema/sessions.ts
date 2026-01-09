import { relations, sql } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";

export const sessions = pgTable(
	"sessions",
	{
		// id: text()
		//   .primaryKey()
		//   .$defaultFn(() => randomUUIDv7()),
		id: text().default(sql`uuidv7()`).primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		activeOrganizationId: text("active_organization_id"),

		token: text("token").notNull().unique(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		expiresAt: timestamp("expires_at").notNull(),
		impersonatedBy: text("impersonated_by"),

		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("sessions_userId_idx").on(table.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	users: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));
