import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameProgress = pgTable("game_progress", {
  id: serial("id").primaryKey(),
  letter: text("letter").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertProgressSchema = createInsertSchema(gameProgress).omit({ 
  id: true 
});

export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof gameProgress.$inferSelect;
