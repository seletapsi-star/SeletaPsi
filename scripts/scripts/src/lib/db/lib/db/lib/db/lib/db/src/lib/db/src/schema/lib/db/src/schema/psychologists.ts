import { pgTable, serial, text, boolean, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const psychologistStatusEnum = pgEnum("psychologist_status", [
  "pending",
  "approved",
  "rejected",
  "suspended",
]);

export const psychologistsTable = pgTable("psychologists", {
  id: serial("id").primaryKey(),
  full_name: text("full_name").notNull(),
  crp: text("crp").notNull(),
  crp_state: text("crp_state").notNull(),
  crp_active: boolean("crp_active").notNull().default(false),
  cpf: text("cpf").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  photo_url: text("photo_url"),
  mini_curriculum: text("mini_curriculum"),
  education_levels: text("education_levels").array().notNull().default([]),
  education_institution: text("education_institution"),
  therapeutic_lines: text("therapeutic_lines").array().notNull().default([]),
  specialties: text("specialties").array().notNull().default([]),
  public_types: text("public_types").array().notNull().default([]),
  modality: text("modality").notNull(),
  session_duration: integer("session_duration").notNull(),
  session_value: integer("session_value").notNull(),
  instagram: text("instagram"),
  website: text("website"),
  status: psychologistStatusEnum("status").notNull().default("pending"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at"),
});

export const insertPsychologistSchema = createInsertSchema(psychologistsTable).omit({
  id: true,
  status: true,
  created_at: true,
  updated_at: true,
});

export type InsertPsychologist = z.infer<typeof insertPsychologistSchema>;
export type Psychologist = typeof psychologistsTable.$inferSelect;
