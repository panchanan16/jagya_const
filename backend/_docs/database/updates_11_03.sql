ALTER TABLE `material_item_list` ADD `payment_status` VARCHAR(155) NULL DEFAULT NULL AFTER `mr_delivery_status`;
ALTER TABLE `material_item_list` ADD `payment_date` VARCHAR(55) NULL DEFAULT NULL AFTER `payment_status`;

ALTER TABLE material_item_list ADD updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

	CREATE TABLE `material_payment_remaining` (
 `rm_id` bigint NOT NULL AUTO_INCREMENT,
 `mr_r_id` bigint DEFAULT NULL,
 `payment_mode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `remaining` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `total_amount` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `rm_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `rm_date` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `project_id` bigint DEFAULT NULL,
 PRIMARY KEY (`rm_id`),
 KEY `mr_r_id` (`mr_r_id`),
 KEY `project_id` (`project_id`),
 CONSTRAINT `material_payment_remaining_ibfk_1` FOREIGN KEY (`mr_r_id`) REFERENCES `material_requests` (`mr_r_id`) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT `material_payment_remaining_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `material_payment_remaining_items` (
 `mr_pri_id` int NOT NULL AUTO_INCREMENT,
 `rm_id` bigint NOT NULL,
 `item_id` bigint DEFAULT NULL,
 `item_mr_id` bigint DEFAULT NULL,
 PRIMARY KEY (`mr_pri_id`),
 KEY `item_id` (`item_id`),
 KEY `material_payment_remaining_items_ibfk_2` (`rm_id`),
 CONSTRAINT `material_payment_remaining_items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `material_item_list` (`mr_item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT `material_payment_remaining_items_ibfk_2` FOREIGN KEY (`rm_id`) REFERENCES `material_payment_remaining` (`rm_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- 20/11/2025-- 13:15
ALTER TABLE `material_item_list` ADD `payment_mode` VARCHAR(55) NULL DEFAULT NULL AFTER `payment_status`;

ALTER TABLE `expenses` CHANGE `exp_date` `exp_date` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

	CREATE TABLE `relations` (
 `rel_id` bigint NOT NULL AUTO_INCREMENT,
 `entity_a` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `entity_a_id` bigint DEFAULT NULL,
 `entity_b` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `entity_b_id` bigint DEFAULT NULL,
 `relation_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
 `meta_data` varchar(155) DEFAULT NULL,
 `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`rel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci