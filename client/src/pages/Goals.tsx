import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useDemo } from "@/contexts/DemoContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { mockGoals } from "@/lib/mockData";

export default function Goals() {
  const { isDemoMode } = useDemo();
  const { user } = useAuth();
  
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalType, setNewGoalType] = useState("hours");

  const { data: goals, isLoading, refetch } = trpc.goals.list.useQuery();
  const createGoalMutation = trpc.goals.create.useMutation();
  const updateGoalMutation = trpc.goals.update.useMutation();

  const handleCreateGoal = async () => {
    if (!newGoalTitle.trim()) {
      toast.error("Please enter a goal title");
      return;
    }

    try {
      await createGoalMutation.mutateAsync({
        title: newGoalTitle,
        type: newGoalType as any,
        targetValue: 10,
        unit: newGoalType === "hours" ? "hours" : "sessions",
      });

      setNewGoalTitle("");
      setShowNewGoal(false);
      refetch();
      toast.success("Goal created!");
    } catch (error) {
      toast.error("Failed to create goal");
    }
  };

  const handleCompleteGoal = async (goalId: number) => {
    try {
      await updateGoalMutation.mutateAsync({
        id: goalId,
        status: "completed",
      });

      refetch();
      toast.success("🎉 Goal completed!");
    } catch (error) {
      toast.error("Failed to complete goal");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">Loading goals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        {isDemoMode && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> Viewing sample goals. Sign in to set your own goals.
            </p>
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Goals</h1>
            <p className="text-gray-600 mt-2">Track your progress and celebrate wins</p>
          </div>
          <Button
            onClick={() => setShowNewGoal(!showNewGoal)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        {/* New Goal Form */}
        {showNewGoal && (
          <Card className="p-6 mb-6 bg-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Create New Goal</h3>
            <div className="space-y-4">
              <Input
                placeholder="Goal title (e.g., Complete 100 focus hours)"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newGoalType}
                  onChange={(e) => setNewGoalType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="hours">Focus Hours</option>
                  <option value="quantity">Sessions</option>
                  <option value="milestone">Milestone</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateGoal}
                  disabled={createGoalMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Goal
                </Button>
                <Button
                  onClick={() => setShowNewGoal(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals && goals.length > 0 ? (
            goals.map((goal) => {
              const progress = goal.currentValue ? (Number(goal.currentValue) / (goal.targetValue ? Number(goal.targetValue) : 1)) * 100 : 0;

              return (
                <Card key={goal.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {goal.currentValue || 0} / {goal.targetValue || 0} {goal.unit}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {goal.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(progress)}% complete
                    </p>
                  </div>

                  {goal.status === "active" && (
                    <Button
                      onClick={() => goal.id && handleCompleteGoal(goal.id)}
                      disabled={updateGoalMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </Button>
                  )}
                </Card>
              );
            })
          ) : (
            <Card className="p-12 text-center bg-white shadow-lg">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No goals yet
              </h3>
              <p className="text-gray-600 mb-4">
                Set your first goal to start tracking progress
              </p>
              <Button
                onClick={() => setShowNewGoal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Goal
              </Button>
            </Card>
          )}
        </div>

        {/* Goal Tips */}
        <Card className="p-6 mt-8 bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold mb-3">💡 Goal Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Set specific, measurable goals for better tracking</li>
            <li>• Connect goals to your Pomodoro sessions for accountability</li>
            <li>• Review your progress weekly to stay motivated</li>
            <li>• Celebrate milestones along the way</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
