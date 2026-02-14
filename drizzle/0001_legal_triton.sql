CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`type` varchar(50),
	`name` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`condition` text,
	`unlocked_at` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `goal_sessions` (
	`goal_id` int NOT NULL,
	`session_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`type` varchar(50),
	`target_value` decimal(10,2),
	`unit` varchar(50),
	`target_date` date,
	`status` varchar(50) DEFAULT 'active',
	`current_value` decimal(10,2) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completed_at` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `goals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `habit_check_ins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`habit_id` int NOT NULL,
	`user_id` int NOT NULL,
	`date` date NOT NULL,
	`completed` boolean NOT NULL,
	`quantity` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `habit_check_ins_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `habit_streaks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`habit_id` int NOT NULL,
	`user_id` int NOT NULL,
	`current_streak` int DEFAULT 0,
	`longest_streak` int DEFAULT 0,
	`last_completed_date` date,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `habit_streaks_id` PRIMARY KEY(`id`),
	CONSTRAINT `habit_streaks_habit_id_unique` UNIQUE(`habit_id`)
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`emoji` varchar(10),
	`frequency` varchar(50),
	`custom_days` varchar(100),
	`tracking_type` varchar(50),
	`target_quantity` int,
	`unit` varchar(50),
	`is_active` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `habits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pomodoro_cycles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`focus_duration` int NOT NULL,
	`break_duration` int NOT NULL,
	`type` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pomodoro_cycles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pomodoro_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`cycle_id` int,
	`focus_duration` int NOT NULL,
	`break_duration` int NOT NULL,
	`sound_ambient` varchar(100),
	`volume_level` int DEFAULT 60,
	`started_at` timestamp NOT NULL,
	`ended_at` timestamp,
	`completed` boolean DEFAULT false,
	`linked_goal_id` int,
	`linked_habit_id` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pomodoro_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`period` varchar(50),
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`total_focus_hours` decimal(10,2),
	`total_sessions` int,
	`consistency_percentage` int,
	`habits_completed` int,
	`habits_total` int,
	`insights` json,
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
