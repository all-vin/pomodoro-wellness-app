import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar, TrendingUp, Clock, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

const CHART_COLORS = ["#f97316", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

const mockWeeklyData = [
  { day: "Mon", sessions: 4, hours: 2 },
  { day: "Tue", sessions: 5, hours: 2.5 },
  { day: "Wed", sessions: 3, hours: 1.5 },
  { day: "Thu", sessions: 6, hours: 3 },
  { day: "Fri", sessions: 5, hours: 2.5 },
  { day: "Sat", sessions: 2, hours: 1 },
  { day: "Sun", sessions: 3, hours: 1.5 },
];

const mockHabitData = [
  { name: "Reading", value: 85 },
  { name: "Exercise", value: 72 },
  { name: "Meditation", value: 90 },
  { name: "Learning", value: 65 },
];

export default function Reports() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");
  const { data: reports, isLoading } = trpc.reports.list.useQuery({ period });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">Loading reports...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Productivity Reports</h1>
          <p className="text-gray-600 mt-2">
            Track your focus patterns and consistency insights
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <Button
              key={p}
              onClick={() => setPeriod(p)}
              variant={period === p ? "default" : "outline"}
              className={period === p ? "bg-indigo-600" : ""}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">28</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Focus Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">14h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Consistency</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">85%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Daily</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Sessions Chart */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#f97316" name="Sessions" />
                <Bar dataKey="hours" fill="#3b82f6" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Habit Completion Chart */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Habit Completion Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockHabitData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockHabitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights */}
        <Card className="p-6 bg-white shadow-lg mb-8">
          <h3 className="text-lg font-semibold mb-4">📊 Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
              <p className="text-gray-700">
                Your most productive day is <strong>Thursday</strong> with an average of 6 sessions
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <p className="text-gray-700">
                You've maintained an <strong>85% consistency</strong> rate this week
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <p className="text-gray-700">
                <strong>Reading</strong> is your most consistent habit at 85% completion
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <p className="text-gray-700">
                You're on track to reach your weekly goal of 15 focus hours
              </p>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-indigo-50 border border-indigo-200">
          <h3 className="text-lg font-semibold mb-4">💡 Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Try scheduling more sessions on your less productive days (Sat & Sun)</li>
            <li>• Your morning sessions are more focused - consider scheduling important work then</li>
            <li>• Keep up the great consistency! You're building strong habits</li>
            <li>• Explore different ambient sounds to boost focus on challenging days</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
