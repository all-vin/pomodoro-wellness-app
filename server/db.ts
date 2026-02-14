import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  pomodoroCycles, InsertPomodoroCycle,
  pomodoroSessions, InsertPomodoroSession,
  habits, InsertHabit,
  habitCheckIns, InsertHabitCheckIn,
  habitStreaks, InsertHabitStreak,
  goals, InsertGoal,
  achievements, InsertAchievement,
  reports, InsertReport
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Pomodoro Cycles
export async function getUserPomodoroCycles(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pomodoroCycles).where(eq(pomodoroCycles.userId, userId));
}

export async function createPomodoroCycle(data: InsertPomodoroCycle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(pomodoroCycles).values(data);
}

// Pomodoro Sessions
export async function createPomodoroSession(data: InsertPomodoroSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(pomodoroSessions).values(data);
}

export async function getUserPomodoroSessions(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pomodoroSessions).where(eq(pomodoroSessions.userId, userId)).limit(limit);
}

export async function updatePomodoroSession(id: number, data: Partial<InsertPomodoroSession>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(pomodoroSessions).set(data).where(eq(pomodoroSessions.id, id));
}

// Habits
export async function getUserHabits(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(habits).where(eq(habits.userId, userId));
}

export async function createHabit(data: InsertHabit) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(habits).values(data);
}

// Habit Check-ins
export async function createHabitCheckIn(data: InsertHabitCheckIn) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(habitCheckIns).values(data);
}

export async function getHabitCheckInsForDate(habitId: number, dateStr: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(habitCheckIns).where(
    and(eq(habitCheckIns.habitId, habitId), eq(habitCheckIns.date, dateStr as any))
  ).limit(1);
  return result[0] || null;
}

// Habit Streaks
export async function getHabitStreak(habitId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(habitStreaks).where(eq(habitStreaks.habitId, habitId)).limit(1);
  return result[0] || null;
}

export async function updateHabitStreak(habitId: number, userId: number, data: Partial<InsertHabitStreak>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getHabitStreak(habitId);
  if (existing) {
    return db.update(habitStreaks).set(data).where(eq(habitStreaks.habitId, habitId));
  } else {
    return db.insert(habitStreaks).values({ habitId, userId, ...data });
  }
}

// Goals
export async function getUserGoals(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(goals).where(eq(goals.userId, userId));
}

export async function createGoal(data: InsertGoal) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(goals).values(data);
}

export async function updateGoal(id: number, data: Partial<InsertGoal>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(goals).set(data).where(eq(goals.id, id));
}

// Achievements
export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(achievements).where(eq(achievements.userId, userId));
}

export async function createAchievement(data: InsertAchievement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(achievements).values(data);
}

// Reports
export async function createReport(data: InsertReport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reports).values(data);
}

export async function getUserReports(userId: number, period: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reports).where(
    and(eq(reports.userId, userId), eq(reports.period, period))
  );
}
