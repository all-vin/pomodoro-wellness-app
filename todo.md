# Pomodoro Wellness App - TODO

## Database & Backend
- [x] Create database schema for users, pomodoro_cycles, pomodoro_sessions, habits, habit_check_ins, habit_streaks, goals, goal_sessions, achievements, reports
- [x] Implement database migrations and execute SQL
- [x] Create tRPC procedures for Pomodoro operations (create session, update session, get sessions)
- [x] Create tRPC procedures for Habits (create, list, check-in, get streaks)
- [x] Create tRPC procedures for Goals (create, list, update progress, complete)
- [x] Create tRPC procedures for Achievements (get unlocked, check conditions)
- [x] Create tRPC procedures for Reports (get daily, weekly, monthly stats)
- [x] Add database query helpers in server/db.ts

## Frontend - Layout & Navigation
- [x] Design and implement DashboardLayout with sidebar navigation
- [x] Create main navigation structure (Timer, Habits, Goals, Reports, Settings)
- [x] Implement responsive design for mobile and desktop
- [x] Set up color palette (Soft Green, Warm Beige, Muted Teal, Cream)
- [x] Configure typography and global styles in index.css

## Pomodoro Timer Feature
- [x] Create Timer page component with main timer display
- [x] Implement customizable Pomodoro cycles (Deep Work 25/5, Leitura 15/3, Meeting Prep 45/10)
- [x] Add cycle selector UI
- [x] Implement play/pause/reset controls
- [x] Create timer countdown logic with state management
- [x] Add progress bar visualization
- [x] Implement timer completion detection and animations
- [x] Add ability to create custom cycles
- [x] Connect timer to database (save sessions)

## Ambient Sounds Feature
- [x] Create sound selector UI (rain, fireplace, library, ocean, lofi, forest, cafe)
- [x] Implement individual volume control for each sound
- [ ] Add sound playback logic with Web Audio API (em progresso)
- [ ] Create sound manager service (em progresso)
- [ ] Implement sound persistence (save user preferences)
- [ ] Add sound toggle on/off functionality
- [ ] Test audio playback across browsers

## Habits Dashboard
- [x] Create Habits page component
- [x] Implement daily habit checklist with visual check-in
- [x] Add quantitative progress tracking (e.g., 4/8 water cups)
- [x] Create monthly calendar view showing completion patterns
- [x] Implement habit creation form
- [ ] Add habit editing/deletion functionality (em progresso)
- [x] Display consistency percentage for the month
- [x] Create habit card component with emoji support
- [ ] Implement real-time progress updates (em progresso)

## Streak System
- [x] Implement streak calculation logic
- [x] Create streak display component with badges
- [x] Add 7-day, 30-day, 100-day milestone badges
- [ ] Implement celebration animations for streak milestones (em progresso)
- [x] Add streak reset logic (daily check)
- [x] Create visual streak indicator (flame icon with counter)
- [x] Add streak history tracking in database
- [x] Implement longest streak calculation

## Goals Center
- [x] Create Goals page component
- [x] Implement goal creation form with types (hours, quantity, milestone, boolean)
- [x] Add goal progress tracking visualization
- [x] Create connection between goals and Pomodoro sessions
- [x] Implement goal completion detection
- [x] Add goal status management (active, completed, paused, cancelled)
- [x] Create goal card component with progress bars
- [x] Add target date tracking
- [ ] Implement goal history view (em progresso)

## Reports & Analytics
- [x] Create Reports page component
- [x] Implement daily report generation (total focus hours, sessions count, consistency)
- [x] Add weekly report with insights and patterns
- [x] Create monthly report with consistency percentage
- [x] Implement charts/visualizations for productivity data
- [x] Add habit completion statistics
- [x] Create focus time by goal visualization
- [ ] Implement report caching/generation logic (em progresso)
- [ ] Add export functionality (opcional)

## Gamification System
- [x] Create Achievements system with badge types
- [x] Implement achievement unlock conditions
- [x] Create achievements display component
- [ ] Add custom theme unlocks based on achievements (em progresso)
- [ ] Implement celebration animations for new achievements (em progresso)
- [x] Create achievement progress tracking
- [ ] Add achievement notifications (em progresso)
- [ ] Implement theme switching based on unlocked themes (em progresso)

## Settings & Preferences
- [ ] Create Settings page (em progresso)
- [ ] Implement sound preferences storage (em progresso)
- [ ] Add theme selection UI (em progresso)
- [ ] Create notification preferences (em progresso)
- [ ] Add data export/import functionality (opcional)
- [ ] Implement user profile management (em progresso)
- [ ] Add dark mode toggle (em progresso)
- [ ] Create reset/clear data options (em progresso)

## Testing & Refinement
- [ ] Write vitest tests for database queries (em progresso)
- [ ] Write vitest tests for tRPC procedures (em progresso)
- [ ] Write vitest tests for streak calculation logic (em progresso)
- [ ] Write vitest tests for achievement conditions (em progresso)
- [ ] Test timer accuracy and state management (em progresso)
- [ ] Test sound playback and volume control (em progresso)
- [ ] Test habit check-in workflow (em progresso)
- [ ] Test goal progress tracking (em progresso)
- [ ] Test report generation (em progresso)
- [ ] Cross-browser testing (em progresso)
- [ ] Mobile responsiveness testing (em progresso)
- [ ] Performance optimization (em progresso)

## Deployment & Final
- [ ] Create checkpoint for deployment (em progresso)
- [ ] Verify all features work end-to-end (em progresso)
- [ ] Test authentication flow (em progresso)
- [ ] Verify database persistence (em progresso)
- [ ] Test on production-like environment (em progresso)
- [ ] Document API endpoints (em progresso)
- [ ] Create user guide/onboarding (em progresso)
