ALTER TABLE `invoice` CHANGE `client_id` `client_id` BIGINT NULL DEFAULT NULL;

UPDATE `invoice` SET `client_id` = NULL WHERE `invoice`.`invoice_id` = 1;

ALTER TABLE `invoice` ADD FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_ibfk_1`; ALTER TABLE `invoice` ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `project_contractor` ADD `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `pro_sub_phase`;

