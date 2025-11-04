ALTER TABLE `material_item_list` ADD `payment_status` VARCHAR(155) NULL DEFAULT NULL AFTER `mr_delivery_status`;
ALTER TABLE `material_item_list` ADD `payment_date` VARCHAR(55) NULL DEFAULT NULL AFTER `payment_status`;

ALTER TABLE material_item_list ADD updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

