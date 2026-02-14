import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PomodoroTimer from "./pages/PomodoroTimer";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Achievements from "./pages/Achievements";
import Reports from "./pages/Reports";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pomodoro"} component={PomodoroTimer} />
      <Route path={"/habits"} component={Habits} />
      <Route path={"/goals"} component={Goals} />
      <Route path={"/achievements"} component={Achievements} />
      <Route path={"/reports"} component={Reports} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
