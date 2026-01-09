import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { invitations } from "./invitations";
import { members } from "./members";
import { sessions } from "./sessions";

export const users = pgTable("users", {
	// id: text()
	//   .primaryKey()
	//   .$defaultFn(() => randomUUIDv7()),
	id: text().default(sql`uuidv7()`).primaryKey(),

	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	username: text("username").unique(),
	displayUsername: text("display_username"),
	role: text("role"),
	banned: boolean("banned").default(false),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires"),

	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts),
	members: many(members),
	invitations: many(invitations),
}));
