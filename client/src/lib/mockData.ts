export const mockHabits = [
  {
    id: 1,
    name: "Morning Meditation",
    emoji: "🧘",
    frequency: "daily",
    trackingType: "boolean",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Read 30 minutes",
    emoji: "📚",
    frequency: "daily",
    trackingType: "boolean",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Exercise",
    emoji: "💪",
    frequency: "daily",
    trackingType: "boolean",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Drink Water",
    emoji: "💧",
    frequency: "daily",
    trackingType: "quantity",
    createdAt: new Date(),
  },
];

export const mockGoals = [
  {
    id: 1,
    title: "Complete 100 focus hours",
    description: "Reach 100 hours of focused work",
    type: "hours",
    targetValue: "100",
    currentValue: "42",
    unit: "hours",
    status: "active",
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Read 12 books this year",
    description: "Complete 12 books by end of year",
    type: "quantity",
    targetValue: "12",
    currentValue: "5",
    unit: "books",
    status: "active",
    targetDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "30-day meditation streak",
    description: "Meditate every day for 30 days",
    type: "milestone",
    targetValue: "30",
    currentValue: "12",
    unit: "days",
    status: "active",
    targetDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
];

export const mockAchievements = [
  {
    id: 1,
    type: "first_pomodoro",
    name: "First Focus",
    description: "Complete your first Pomodoro session",
    icon: "🍅",
    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    type: "fifty_sessions",
    name: "Focused Mind",
    description: "Complete 50 Pomodoro sessions",
    icon: "🧠",
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    type: "seven_day_streak",
    name: "Week Warrior",
    description: "Maintain a 7-day habit streak",
    icon: "🔥",
    unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const mockWeeklyStats = {
  totalSessions: 28,
  totalFocusHours: 14,
  consistency: 85,
  averageDaily: 4,
  bestDay: "Thursday",
  bestDayCount: 6,
};

export const mockHabitStats = [
  { name: "Reading", value: 85 },
  { name: "Exercise", value: 72 },
  { name: "Meditation", value: 90 },
  { name: "Learning", value: 65 },
];

export const mockWeeklyActivity = [
  { day: "Mon", sessions: 4, hours: 2 },
  { day: "Tue", sessions: 5, hours: 2.5 },
  { day: "Wed", sessions: 3, hours: 1.5 },
  { day: "Thu", sessions: 6, hours: 3 },
  { day: "Fri", sessions: 5, hours: 2.5 },
  { day: "Sat", sessions: 2, hours: 1 },
  { day: "Sun", sessions: 3, hours: 1.5 },
];
