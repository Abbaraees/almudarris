CREATE TABLE `attendance` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`student_id` text NOT NULL,
	`status` text DEFAULT 'ABSENT' NOT NULL,
	`completeness` integer DEFAULT 0 NOT NULL,
	`session` text DEFAULT 'EVENING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`gender` text NOT NULL,
	`teacher_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transaction_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`table_name` text NOT NULL,
	`operations` text NOT NULL,
	`record_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`synched` integer DEFAULT false
);
