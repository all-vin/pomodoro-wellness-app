import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const AMBIENT_SOUNDS = [
  { id: "rain", name: "Rain", icon: "🌧️" },
  { id: "fireplace", name: "Fireplace", icon: "🔥" },
  { id: "library", name: "Library", icon: "📚" },
  { id: "ocean", name: "Ocean", icon: "🌊" },
  { id: "lofi", name: "Lofi", icon: "🎵" },
  { id: "forest", name: "Forest", icon: "🌲" },
  { id: "cafe", name: "Café", icon: "☕" },
];

const POMODORO_CYCLES = [
  { name: "Deep Work", focus: 25, break: 5 },
  { name: "Leitura", focus: 15, break: 3 },
  { name: "Meeting Prep", focus: 45, break: 10 },
];

export default function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [selectedCycle, setSelectedCycle] = useState(0);
  const [selectedSound, setSelectedSound] = useState("rain");
  const [soundVolume, setSoundVolume] = useState(60);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pomodoroSessionsMutation = trpc.pomodoroSessions.create.useMutation();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = async () => {
    setIsRunning(false);

    if (!isBreak) {
      // Save session to database
      try {
        await pomodoroSessionsMutation.mutateAsync({
          focusDuration,
          breakDuration,
          soundAmbient: selectedSound,
          volumeLevel: soundVolume,
        });
        
        // Mark session as completed
        // This will be handled by the update mutation
      } catch (error) {
        console.error("Failed to save session:", error);
      }

      setSessionsCompleted((prev) => prev + 1);
      setIsBreak(true);
      setTimeLeft(breakDuration * 60);
    } else {
      setIsBreak(false);
      setTimeLeft(focusDuration * 60);
    }

    // Play notification sound
    playNotificationSound();
  };

  const playNotificationSound = () => {
    // Using Web Audio API for notification
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleCycleSelect = (index: number) => {
    setSelectedCycle(index);
    const cycle = POMODORO_CYCLES[index];
    setFocusDuration(cycle.focus);
    setBreakDuration(cycle.break);
    setIsBreak(false);
    setTimeLeft(cycle.focus * 60);
    setIsRunning(false);
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(focusDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = isBreak
    ? ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100
    : ((focusDuration * 60 - timeLeft) / (focusDuration * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pomodoro Timer</h1>
          <p className="text-gray-600">
            {isBreak ? "Break Time" : "Focus Time"}
            {sessionsCompleted > 0 && ` • ${sessionsCompleted} sessions completed`}
          </p>
        </div>

        {/* Cycle Selection */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {POMODORO_CYCLES.map((cycle, index) => (
            <Button
              key={index}
              onClick={() => handleCycleSelect(index)}
              variant={selectedCycle === index ? "default" : "outline"}
              className="h-auto py-3"
            >
              <div className="text-center">
                <div className="font-semibold">{cycle.name}</div>
                <div className="text-xs opacity-75">{cycle.focus}m/{cycle.break}m</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Timer Display */}
        <Card className="p-8 mb-8 bg-white shadow-lg">
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Circular Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={isBreak ? "#10b981" : "#f97316"}
                strokeWidth="8"
                strokeDasharray={`${(progressPercent / 100) * 565.48} 565.48`}
                className="transition-all duration-500"
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 font-mono">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {isBreak ? "Break" : "Focus"}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="rounded-full w-16 h-16"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>

          {/* Duration Adjusters */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Focus Duration: {focusDuration}m
              </label>
              <Slider
                value={[focusDuration]}
                onValueChange={(value) => {
                  setFocusDuration(value[0]);
                  if (!isBreak && !isRunning) {
                    setTimeLeft(value[0] * 60);
                  }
                }}
                min={1}
                max={60}
                step={1}
                disabled={isRunning}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Break Duration: {breakDuration}m
              </label>
              <Slider
                value={[breakDuration]}
                onValueChange={(value) => {
                  setBreakDuration(value[0]);
                  if (isBreak && !isRunning) {
                    setTimeLeft(value[0] * 60);
                  }
                }}
                min={1}
                max={30}
                step={1}
                disabled={isRunning}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Ambient Sounds */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-800">Ambient Sounds</h3>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {AMBIENT_SOUNDS.map((sound) => (
              <Button
                key={sound.id}
                onClick={() => setSelectedSound(sound.id)}
                variant={selectedSound === sound.id ? "default" : "outline"}
                className="h-auto py-2 flex flex-col items-center gap-1"
              >
                <span className="text-2xl">{sound.icon}</span>
                <span className="text-xs">{sound.name}</span>
              </Button>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Volume: {soundVolume}%
            </label>
            <Slider
              value={[soundVolume]}
              onValueChange={(value) => setSoundVolume(value[0])}
              min={0}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>
        </Card>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
