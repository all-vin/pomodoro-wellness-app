import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, date, boolean, json } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Pomodoro Cycles
export const pomodoroCycles = mysqlTable("pomodoro_cycles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  focusDuration: int("focus_duration").notNull(),
  breakDuration: int("break_duration").notNull(),
  type: varchar("type", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PomodoroCycle = typeof pomodoroCycles.$inferSelect;
export type InsertPomodoroCycle = typeof pomodoroCycles.$inferInsert;

// Pomodoro Sessions
export const pomodoroSessions = mysqlTable("pomodoro_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  cycleId: int("cycle_id"),
  focusDuration: int("focus_duration").notNull(),
  breakDuration: int("break_duration").notNull(),
  soundAmbient: varchar("sound_ambient", { length: 100 }),
  volumeLevel: int("volume_level").default(60),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
  completed: boolean("completed").default(false),
  linkedGoalId: int("linked_goal_id"),
  linkedHabitId: int("linked_habit_id"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PomodoroSession = typeof pomodoroSessions.$inferSelect;
export type InsertPomodoroSession = typeof pomodoroSessions.$inferInsert;

// Habits
export const habits = mysqlTable("habits", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  emoji: varchar("emoji", { length: 10 }),
  frequency: varchar("frequency", { length: 50 }),
  customDays: varchar("custom_days", { length: 100 }),
  trackingType: varchar("tracking_type", { length: 50 }),
  targetQuantity: int("target_quantity"),
  unit: varchar("unit", { length: 50 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Habit = typeof habits.$inferSelect;
export type InsertHabit = typeof habits.$inferInsert;

// Habit Check-ins
export const habitCheckIns = mysqlTable("habit_check_ins", {
  id: int("id").autoincrement().primaryKey(),
  habitId: int("habit_id").notNull(),
  userId: int("user_id").notNull(),
  date: date("date").notNull(),
  completed: boolean("completed").notNull(),
  quantity: int("quantity"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type HabitCheckIn = typeof habitCheckIns.$inferSelect;
export type InsertHabitCheckIn = typeof habitCheckIns.$inferInsert;

// Habit Streaks
export const habitStreaks = mysqlTable("habit_streaks", {
  id: int("id").autoincrement().primaryKey(),
  habitId: int("habit_id").notNull().unique(),
  userId: int("user_id").notNull(),
  currentStreak: int("current_streak").default(0),
  longestStreak: int("longest_streak").default(0),
  lastCompletedDate: date("last_completed_date"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HabitStreak = typeof habitStreaks.$inferSelect;
export type InsertHabitStreak = typeof habitStreaks.$inferInsert;

// Goals
export const goals = mysqlTable("goals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }),
  targetValue: decimal("target_value", { precision: 10, scale: 2 }),
  unit: varchar("unit", { length: 50 }),
  targetDate: date("target_date"),
  status: varchar("status", { length: 50 }).default("active"),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;

// Goal Sessions
export const goalSessions = mysqlTable("goal_sessions", {
  goalId: int("goal_id").notNull(),
  sessionId: int("session_id").notNull(),
});

export type GoalSession = typeof goalSessions.$inferSelect;
export type InsertGoalSession = typeof goalSessions.$inferInsert;

// Achievements
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  type: varchar("type", { length: 50 }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  condition: text("condition"),
  unlockedAt: timestamp("unlocked_at").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

// Reports
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  period: varchar("period", { length: 50 }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalFocusHours: decimal("total_focus_hours", { precision: 10, scale: 2 }),
  totalSessions: int("total_sessions"),
  consistencyPercentage: int("consistency_percentage"),
  habitsCompleted: int("habits_completed"),
  habitsTotal: int("habits_total"),
  insights: json("insights"),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
