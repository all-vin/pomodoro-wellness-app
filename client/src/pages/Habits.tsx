import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Flame, CheckCircle2, Circle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Habits() {
  const [showNewHabit, setShowNewHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitEmoji, setNewHabitEmoji] = useState("✨");

  const { data: habits, isLoading, refetch } = trpc.habits.list.useQuery();
  const createHabitMutation = trpc.habits.create.useMutation();
  const checkInMutation = trpc.habitCheckIns.checkIn.useMutation();
  const { data: streaks } = trpc.habitStreaks.get.useQuery({ habitId: 1 });

  const handleCreateHabit = async () => {
    if (!newHabitName.trim()) {
      toast.error("Please enter a habit name");
      return;
    }

    try {
      await createHabitMutation.mutateAsync({
        name: newHabitName,
        emoji: newHabitEmoji,
        frequency: "daily",
        trackingType: "boolean",
      });

      setNewHabitName("");
      setNewHabitEmoji("✨");
      setShowNewHabit(false);
      refetch();
      toast.success("Habit created!");
    } catch (error) {
      toast.error("Failed to create habit");
    }
  };

  const handleCheckIn = async (habitId: number) => {
    const today = new Date().toISOString().split("T")[0];

    try {
      await checkInMutation.mutateAsync({
        habitId,
        date: today,
        completed: true,
      });

      refetch();
      toast.success("✅ Habit checked in!");
    } catch (error) {
      toast.error("Failed to check in habit");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">Loading habits...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Habits</h1>
            <p className="text-gray-600 mt-2">Build consistency, one day at a time</p>
          </div>
          <Button
            onClick={() => setShowNewHabit(!showNewHabit)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Habit
          </Button>
        </div>

        {/* New Habit Form */}
        {showNewHabit && (
          <Card className="p-6 mb-6 bg-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Create New Habit</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Habit name (e.g., Read 30 minutes)"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Emoji"
                  value={newHabitEmoji}
                  onChange={(e) => setNewHabitEmoji(e.target.value)}
                  className="w-20"
                  maxLength={2}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateHabit}
                  disabled={createHabitMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Create Habit
                </Button>
                <Button
                  onClick={() => setShowNewHabit(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Habits List */}
        <div className="space-y-4">
          {habits && habits.length > 0 ? (
            habits.map((habit) => (
              <Card key={habit.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{habit.emoji}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {habit.name}
                        </h3>
                        <p className="text-sm text-gray-500">Daily</p>
                      </div>
                    </div>

                    {/* Streak Display */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-semibold text-gray-700">
                          0 day streak
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Best: 0 days
                      </div>
                    </div>

                    {/* Mini Calendar */}
                    <div className="mt-4 flex gap-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => habit.id && handleCheckIn(habit.id)}
                    disabled={checkInMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 h-12 w-12 rounded-full p-0"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center bg-white shadow-lg">
              <Circle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No habits yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first habit to start building consistency
              </p>
              <Button
                onClick={() => setShowNewHabit(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Habit
              </Button>
            </Card>
          )}
        </div>

        {/* Streak Badges */}
        <Card className="p-6 mt-8 bg-white shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Milestone Badges</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🔥</div>
              <p className="text-sm font-semibold">7 Day Streak</p>
              <p className="text-xs text-gray-500">Locked</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">💪</div>
              <p className="text-sm font-semibold">30 Day Streak</p>
              <p className="text-xs text-gray-500">Locked</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">👑</div>
              <p className="text-sm font-semibold">100 Day Streak</p>
              <p className="text-xs text-gray-500">Locked</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
