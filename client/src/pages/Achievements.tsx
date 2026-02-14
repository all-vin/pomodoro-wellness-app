import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Lock, Unlock, Star } from "lucide-react";

const ACHIEVEMENTS = [
  {
    id: "first_pomodoro",
    name: "First Focus",
    description: "Complete your first Pomodoro session",
    icon: "🍅",
    rarity: "common",
  },
  {
    id: "seven_day_streak",
    name: "Week Warrior",
    description: "Maintain a 7-day habit streak",
    icon: "🔥",
    rarity: "uncommon",
  },
  {
    id: "thirty_day_streak",
    name: "Month Master",
    description: "Maintain a 30-day habit streak",
    icon: "💪",
    rarity: "rare",
  },
  {
    id: "hundred_day_streak",
    name: "Century Champion",
    description: "Maintain a 100-day habit streak",
    icon: "👑",
    rarity: "legendary",
  },
  {
    id: "fifty_sessions",
    name: "Focused Mind",
    description: "Complete 50 Pomodoro sessions",
    icon: "🧠",
    rarity: "uncommon",
  },
  {
    id: "hundred_sessions",
    name: "Focus Master",
    description: "Complete 100 Pomodoro sessions",
    icon: "⚡",
    rarity: "rare",
  },
  {
    id: "five_habits",
    name: "Habit Builder",
    description: "Create 5 different habits",
    icon: "🏗️",
    rarity: "uncommon",
  },
  {
    id: "all_sounds",
    name: "Sound Explorer",
    description: "Use all 7 ambient sounds",
    icon: "🎵",
    rarity: "uncommon",
  },
  {
    id: "perfect_week",
    name: "Perfect Week",
    description: "Complete all daily habits for a full week",
    icon: "✨",
    rarity: "rare",
  },
  {
    id: "goal_master",
    name: "Goal Achiever",
    description: "Complete 10 goals",
    icon: "🎯",
    rarity: "rare",
  },
];

export default function Achievements() {
  const { data: achievements, isLoading } = trpc.achievements.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">Loading achievements...</div>
        </div>
      </div>
    );
  }

  const unlockedIds = new Set(achievements?.map((a) => a.type) || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-2">
            Unlock badges and celebrate your progress
          </p>
        </div>

        {/* Stats */}
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {achievements?.length || 0}
              </div>
              <p className="text-gray-600 text-sm">Unlocked</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">
                {ACHIEVEMENTS.length - (achievements?.length || 0)}
              </div>
              <p className="text-gray-600 text-sm">Locked</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">
                {Math.round(((achievements?.length || 0) / ACHIEVEMENTS.length) * 100)}%
              </div>
              <p className="text-gray-600 text-sm">Complete</p>
            </div>
          </div>
        </Card>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = unlockedIds.has(achievement.id);
            const rarityColors = {
              common: "bg-gray-100 border-gray-300",
              uncommon: "bg-green-100 border-green-300",
              rare: "bg-blue-100 border-blue-300",
              legendary: "bg-purple-100 border-purple-300",
            };

            return (
              <Card
                key={achievement.id}
                className={`p-6 border-2 transition-all hover:shadow-lg ${
                  isUnlocked
                    ? rarityColors[achievement.rarity as keyof typeof rarityColors]
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{achievement.icon}</div>
                  {isUnlocked ? (
                    <Unlock className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {achievement.description}
                </p>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={isUnlocked ? "default" : "secondary"}
                    className={
                      isUnlocked
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }
                  >
                    {achievement.rarity}
                  </Badge>
                  {isUnlocked && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Rarity Guide */}
        <Card className="p-6 mt-8 bg-white shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Achievement Rarity</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="font-semibold text-gray-900">Common</p>
              <p className="text-xs text-gray-600">Easy to unlock</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <p className="font-semibold text-gray-900">Uncommon</p>
              <p className="text-xs text-gray-600">Requires effort</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <p className="font-semibold text-gray-900">Rare</p>
              <p className="text-xs text-gray-600">Challenging</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <p className="font-semibold text-gray-900">Legendary</p>
              <p className="text-xs text-gray-600">Very difficult</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
