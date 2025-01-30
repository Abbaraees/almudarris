CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`gender` text NOT NULL,
	`teacher_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
