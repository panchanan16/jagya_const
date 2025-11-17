ALTER TABLE `material_item_list` ADD `payment_status` VARCHAR(155) NULL DEFAULT NULL AFTER `mr_delivery_status`;
ALTER TABLE `material_item_list` ADD `payment_date` VARCHAR(55) NULL DEFAULT NULL AFTER `payment_status`;

ALTER TABLE material_item_list ADD updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

	CREATE TABLE `material_payment_remaining` (
 `rm_id` int NOT NULL AUTO_INCREMENT,
 `rm_group_id` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `mr_r_id` bigint DEFAULT NULL,
 `item_id` bigint DEFAULT NULL,
 `payment_made` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `remaining` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `total_amount` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `rm_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `rm_date` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`rm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

ALTER TABLE `material_payment_remaining` ADD FOREIGN KEY (`mr_r_id`) REFERENCES `material_requests`(`mr_r_id`) ON DELETE CASCADE ON UPDATE CASCADE; ALTER TABLE `material_payment_remaining` ADD FOREIGN KEY (`item_id`) REFERENCES `material_item_list`(`mr_item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `material_payment_remaining_items` ADD FOREIGN KEY (`rm_id`) REFERENCES `material_payment_remaining`(`rm_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `material_payment_remaining_items` DROP FOREIGN KEY `material_payment_remaining_items_ibfk_2`; ALTER TABLE `material_payment_remaining_items` ADD CONSTRAINT `material_payment_remaining_items_ibfk_2` FOREIGN KEY (`rm_id`) REFERENCES `material_payment_remaining`(`rm_id`) ON DELETE CASCADE ON UPDATE CASCADE;