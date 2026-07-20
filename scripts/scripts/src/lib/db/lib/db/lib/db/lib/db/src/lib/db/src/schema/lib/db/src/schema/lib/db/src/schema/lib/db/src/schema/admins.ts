import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const adminsTable = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export type Admin = typeof adminsTable.$inferSelect;
