import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getUserPomodoroCycles,
  createPomodoroCycle,
  createPomodoroSession,
  getUserPomodoroSessions,
  updatePomodoroSession,
  getUserHabits,
  createHabit,
  createHabitCheckIn,
  getHabitCheckInsForDate,
  getHabitStreak,
  updateHabitStreak,
  getUserGoals,
  createGoal,
  updateGoal,
  getUserAchievements,
  createAchievement,
  createReport,
  getUserReports,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  pomodoroCycles: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserPomodoroCycles(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        focusDuration: z.number().min(1),
        breakDuration: z.number().min(1),
        type: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createPomodoroCycle({
          userId: ctx.user.id,
          ...input,
        });
      }),
  }),

  pomodoroSessions: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserPomodoroSessions(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        cycleId: z.number().optional(),
        focusDuration: z.number().min(1),
        breakDuration: z.number().min(1),
        soundAmbient: z.string().optional(),
        volumeLevel: z.number().min(0).max(100).optional(),
        linkedGoalId: z.number().optional(),
        linkedHabitId: z.number().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createPomodoroSession({
          userId: ctx.user.id,
          startedAt: new Date() as any,
          ...input,
        });
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        completed: z.boolean().optional(),
        endedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updatePomodoroSession(id, data);
      }),
  }),

  habits: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserHabits(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        emoji: z.string().optional(),
        frequency: z.string(),
        trackingType: z.enum(["boolean", "quantitative"]),
        targetQuantity: z.number().optional(),
        unit: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createHabit({
          userId: ctx.user.id,
          ...input,
        });
      }),
  }),

  habitCheckIns: router({
    checkIn: protectedProcedure
      .input(z.object({
        habitId: z.number(),
        date: z.string(),
        completed: z.boolean(),
        quantity: z.number().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const checkIn = await createHabitCheckIn({
          habitId: input.habitId,
          userId: ctx.user.id,
          date: input.date as any,
          completed: input.completed,
          quantity: input.quantity,
          notes: input.notes,
        });

        if (input.completed) {
          const streak = await getHabitStreak(input.habitId);
          const newStreak = (streak?.currentStreak || 0) + 1;
          const longestStreak = Math.max(newStreak, streak?.longestStreak || 0);

          await updateHabitStreak(input.habitId, ctx.user.id, {
            currentStreak: newStreak,
            longestStreak: longestStreak,
            lastCompletedDate: input.date as any,
          });
        }

        return checkIn;
      }),
    getForDate: protectedProcedure
      .input(z.object({
        habitId: z.number(),
        date: z.string(),
      }))
      .query(async ({ input }) => {
        return getHabitCheckInsForDate(input.habitId, input.date);
      }),
  }),

  habitStreaks: router({
    get: protectedProcedure
      .input(z.object({ habitId: z.number() }))
      .query(async ({ input }) => {
        return getHabitStreak(input.habitId);
      }),
  }),

  goals: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserGoals(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(["hours", "quantity", "milestone", "boolean"]),
        targetValue: z.number().optional(),
        unit: z.string().optional(),
        targetDate: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createGoal({
          userId: ctx.user.id,
          status: "active",
          ...input,
          targetValue: input.targetValue ? String(input.targetValue) : undefined,
        } as any);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        currentValue: z.number().optional(),
        status: z.enum(["active", "completed", "paused", "cancelled"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateGoal(id, {
          ...data,
          currentValue: data.currentValue ? String(data.currentValue) : undefined,
        } as any);
      }),
  }),

  achievements: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserAchievements(ctx.user.id);
    }),
    unlock: protectedProcedure
      .input(z.object({
        type: z.string(),
        name: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createAchievement({
          userId: ctx.user.id,
          unlockedAt: new Date(),
          ...input,
        });
      }),
  }),

  reports: router({
    list: protectedProcedure
      .input(z.object({ period: z.enum(["daily", "weekly", "monthly"]) }))
      .query(async ({ ctx, input }) => {
        return getUserReports(ctx.user.id, input.period);
      }),
    create: protectedProcedure
      .input(z.object({
        period: z.enum(["daily", "weekly", "monthly"]),
        startDate: z.string(),
        endDate: z.string(),
        totalFocusHours: z.number().optional(),
        totalSessions: z.number().optional(),
        consistencyPercentage: z.number().optional(),
        habitsCompleted: z.number().optional(),
        habitsTotal: z.number().optional(),
        insights: z.record(z.string(), z.any()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { period, startDate, endDate, ...rest } = input;
        return createReport({
          userId: ctx.user.id,
          period,
          startDate: new Date(startDate) as any,
          endDate: new Date(endDate) as any,
          totalFocusHours: rest.totalFocusHours ? String(rest.totalFocusHours) : undefined,
          totalSessions: rest.totalSessions,
          consistencyPercentage: rest.consistencyPercentage,
          habitsCompleted: rest.habitsCompleted,
          habitsTotal: rest.habitsTotal,
          insights: rest.insights,
        } as any);
      }),
  }),
});

export type AppRouter = typeof appRouter;
