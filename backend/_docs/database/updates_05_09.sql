ALTER TABLE `invoice` CHANGE `client_id` `client_id` BIGINT NULL DEFAULT NULL;

ALTER TABLE `invoice` ADD FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_ibfk_1`; ALTER TABLE `invoice` ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;
