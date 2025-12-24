ALTER TABLE `collections` ADD `col_type` VARCHAR(155) NULL DEFAULT NULL AFTER `col_project_phase`,
ADD `col_category` VARCHAR(155) NULL DEFAULT NULL AFTER `col_type`,
ADD `col_pct` VARCHAR(55) NULL DEFAULT NULL AFTER `col_category`,
ADD `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP AFTER `col_pct`;

ALTER TABLE contractor_payments ADD pay_date VARCHAR(155) NULL AFTER pay_project_id,
ADD pay_total_bill VARCHAR(155) NULL AFTER pay_date,
ADD pay_tds VARCHAR(50) NULL AFTER pay_total_bill,
ADD pay_payable VARCHAR(155) NULL AFTER pay_tds,
ADD pay_previous VARCHAR(155) NULL AFTER pay_payable,
ADD pay_grand_total VARCHAR(155) NULL AFTER pay_previous,
ADD pay_pending VARCHAR(155) NULL AFTER pay_grand_total,
ADD pay_labour VARCHAR(155) NULL AFTER pay_pending,
ADD pay_work_status VARCHAR(255) NULL AFTER pay_labour,
ADD pay_sqft VARCHAR(50) NULL AFTER pay_work_status,
ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER pay_sqft;


ALTER TABLE `collections` ADD `col_value` VARCHAR(155) NULL DEFAULT NULL AFTER `col_date`;