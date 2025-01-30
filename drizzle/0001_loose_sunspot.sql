CREATE TABLE `transaction_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`table_name` text NOT NULL,
	`operations` text NOT NULL,
	`record_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`synched` integer DEFAULT false
);
