CREATE TABLE `employees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`designation_id` integer NOT NULL,
	`email` text NOT NULL,
	`phone` numeric NOT NULL,
	FOREIGN KEY (`designation_id`) REFERENCES `designations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_email_unique` ON `employees` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_phone_unique` ON `employees` (`phone`);