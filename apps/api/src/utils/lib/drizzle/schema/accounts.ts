import { relations, sql } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";

export const accounts = pgTable(
	"accounts",
	{
		// id: text()
		//   .primaryKey()
		//   .$defaultFn(() => randomUUIDv7()),
		id: text().default(sql`uuidv7()`).primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		idToken: text("id_token"),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		scope: text("scope"),
		password: text("password"),
		accessToken: text("access_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshToken: text("refresh_token"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),

		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("accounts_userId_idx").on(table.userId)],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	users: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));
