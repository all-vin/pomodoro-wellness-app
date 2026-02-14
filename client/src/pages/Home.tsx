import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Clock, Zap, Target, TrendingUp, Award } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useDemo } from "@/contexts/DemoContext";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-orange-600">🍅 Pomodoro Wellness</div>
            <Button asChild>
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Master Your Productivity with Elegance
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Combine the Pomodoro technique with habit tracking, ambient sounds, and goal management
              for a complete wellness experience.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
              <DemoButton />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <Card className="p-6">
              <Clock className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Pomodoro Timer</h3>
              <p className="text-gray-600">
                Customizable focus cycles with Deep Work, Leitura, and Meeting Prep presets
              </p>
            </Card>

            <Card className="p-6">
              <Zap className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Ambient Sounds</h3>
              <p className="text-gray-600">
                7 immersive soundscapes with individual volume control for perfect focus
              </p>
            </Card>

            <Card className="p-6">
              <Target className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Habit Tracking</h3>
              <p className="text-gray-600">
                Daily check-ins with streak system and visual progress tracking
              </p>
            </Card>

            <Card className="p-6">
              <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Goals & Reports</h3>
              <p className="text-gray-600">
                Set goals, track progress, and get weekly/monthly productivity insights
              </p>
            </Card>

            <Card className="p-6">
              <Award className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Achievements</h3>
              <p className="text-gray-600">
                Unlock badges at 7, 30, and 100-day streaks with celebration animations
              </p>
            </Card>

            <Card className="p-6">
              <span className="text-3xl mb-3 block">🎨</span>
              <h3 className="text-lg font-semibold mb-2">Custom Themes</h3>
              <p className="text-gray-600">
                Elegant design with light/dark mode and customizable color schemes
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-orange-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Productivity?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who are achieving their goals with our elegant wellness app
            </p>
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <a href={getLoginUrl()}>Start Your Journey</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-600">🍅 Pomodoro Wellness</div>
          <div className="text-gray-600">Welcome, {user?.name}!</div>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/pomodoro">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Start Pomodoro</h3>
              <p className="text-gray-600">Begin a focused work session</p>
            </Card>
          </Link>

          <Link href="/habits">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <Target className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">My Habits</h3>
              <p className="text-gray-600">Track daily habits and streaks</p>
            </Card>
          </Link>

          <Link href="/goals">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Goals</h3>
              <p className="text-gray-600">Set and track your goals</p>
            </Card>
          </Link>

          <Link href="/achievements">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <Award className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Achievements</h3>
              <p className="text-gray-600">Unlock badges and celebrate wins</p>
            </Card>
          </Link>

          <Link href="/reports">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Reports</h3>
              <p className="text-gray-600">View productivity insights</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DemoButton() {
  const { setIsDemoMode } = useDemo();
  const [, setLocation] = useLocation();

  const handleDemo = () => {
    setIsDemoMode(true);
    setLocation("/pomodoro");
  };

  return (
    <Button
      onClick={handleDemo}
      size="lg"
      variant="outline"
      className="border-orange-600 text-orange-600 hover:bg-orange-50"
    >
      Explore Demo
    </Button>
  );
}
