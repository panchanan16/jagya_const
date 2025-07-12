-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2025 at 05:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jagya_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch_auth`
--

CREATE TABLE `branch_auth` (
  `br_a_id` int(11) NOT NULL,
  `br_r_id` int(11) NOT NULL,
  `br_user_id` varchar(255) NOT NULL,
  `br_password` varchar(255) NOT NULL,
  `br_token` varchar(255) DEFAULT NULL,
  `br_isactive` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_auth`
--

INSERT INTO `branch_auth` (`br_a_id`, `br_r_id`, `br_user_id`, `br_password`, `br_token`, `br_isactive`) VALUES
(9, 3, 'deka@example.com', '$2a$12$T1Z8isdBMC/zf.2OQ9rsnOfO65Mif54GxjIiGBMC6BzydBGxycMIy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDc1ODg3ODEsImV4cCI6MTc0ODAyMDc4MX0.2N4f4zTw0oDW1j31h7pT7yZvyCOslERjY5y1qsyo7vs', 1);

-- --------------------------------------------------------

--
-- Table structure for table `branch_clients`
--

CREATE TABLE `branch_clients` (
  `b_client_id` bigint(20) NOT NULL,
  `b_r_id` int(11) NOT NULL,
  `b_client_name` varchar(200) DEFAULT NULL,
  `b_client_ref_no` varchar(200) DEFAULT NULL,
  `b_client_contact` varchar(15) DEFAULT NULL,
  `b_client_alt_contact` varchar(15) DEFAULT NULL,
  `b_client_address` varchar(300) DEFAULT NULL,
  `b_project_name` varchar(255) DEFAULT NULL,
  `b_client_email` varchar(80) DEFAULT NULL,
  `b_client_housetype` varchar(100) DEFAULT NULL,
  `b_client_rcctype` varchar(100) DEFAULT NULL,
  `b_client_totalcost` bigint(20) DEFAULT NULL,
  `b_client_advancepayment` int(50) DEFAULT NULL,
  `b_client_sitedesc` varchar(300) DEFAULT NULL,
  `b_client_duration` varchar(100) DEFAULT NULL,
  `b_client_commision` int(11) DEFAULT 1,
  `b_admin_approval` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved_at` varchar(155) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_clients`
--

INSERT INTO `branch_clients` (`b_client_id`, `b_r_id`, `b_client_name`, `b_client_ref_no`, `b_client_contact`, `b_client_alt_contact`, `b_client_address`, `b_project_name`, `b_client_email`, `b_client_housetype`, `b_client_rcctype`, `b_client_totalcost`, `b_client_advancepayment`, `b_client_sitedesc`, `b_client_duration`, `b_client_commision`, `b_admin_approval`, `created_at`, `approved_at`) VALUES
(5, 3, 'Acme Corporation', 'ACME-2023-0015', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, NULL, '2025-05-16 11:44:00', '2025-05-16 17:44:04'),
(8, 3, 'Acme Corporation', 'ACME-2023-00d15', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-16 11:44:00', '2025-05-16 17:46:37'),
(11, 3, 'Acme Corporation', 'ACME-2023-00d5', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-16 11:44:00', '2025-05-16 17:53:22'),
(13, 3, 'Acme Corporation', 'ACME-2023-005', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-16 11:44:00', '2025-05-16 17:54:03'),
(15, 3, 'Acme Corporation', 'ACME-2023-05', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-16 11:44:00', NULL),
(18, 3, 'Acme Corporation=======', 'ACME-2023-5', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-16 11:44:00', NULL),
(22, 3, 'Acme Corporation', 'ACME-20236', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-16 11:44:00', NULL),
(27, 3, 'Acme Corporation 2563', 'ACME-202367', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-18 16:18:28', NULL),
(30, 3, 'Acme Corporation 2563', 'ACME-202368', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-18 16:26:26', NULL),
(32, 3, 'Acme Corporation 2563', 'ACME-202369', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-18 16:43:26', NULL),
(33, 3, 'Acme Corporation 2563', 'ACME-202370', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-18 16:45:15', NULL),
(34, 3, 'Acme Corporation 2563', 'ACME-202371', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-18 16:46:28', NULL),
(36, 3, 'Acme Corporation 2563', 'ACME-202372', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-18 16:46:53', '2025-05-24 14:03:38'),
(37, 3, 'Acme Corporation 2563', 'ACME-202373', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-18 16:47:30', '2025-05-19 12:35:40'),
(38, 3, 'Acme Corporation 2563', 'ACME-202374', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-18 16:55:56', '2025-05-19 12:35:02'),
(39, 3, 'Acme Corporation 2563', 'ACME-202375', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-18 16:55:58', '2025-05-19 12:34:00'),
(40, 3, 'Acme Corporation 2563', 'ACME-202376', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 1, '2025-05-18 16:55:59', '2025-05-19 12:33:07'),
(41, 3, 'Acme Corporation 2563', 'ACME-202377', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-19 16:29:40', NULL),
(42, 3, 'Acme Corporation 2563', 'ACME-202378', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-19 16:30:57', NULL),
(43, 3, 'Acme Corporation 2563', 'ACME-202379', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-19 16:33:08', NULL),
(44, 3, 'Mintu Sharma', 'ACME-202380', '9401069337', '', 'siwan', NULL, 'm@gamail.com', 'G+1', NULL, 5000, 500, 'noadfa', 'aasdgasdf', 0, 0, '2025-05-19 16:38:30', NULL),
(45, 3, 'Acme Corporation 2563', 'ACME-202381', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-19 16:50:22', NULL),
(46, 3, 'Acme Corporation 2563', 'ACME-202382', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-19 16:50:24', NULL),
(47, 3, 'Acme Corporation 2563', 'ACME-202383', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', NULL, 'info@acmecorp.com', 'Warehouse', 'Pre-engineered Steel', 500000, 150000, 'Large open area, flat terrain.', '6 months', 0, 0, '2025-05-19 16:50:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `branch_data`
--

CREATE TABLE `branch_data` (
  `br_id` int(11) NOT NULL,
  `b_name` varchar(200) DEFAULT NULL,
  `b_location` varchar(300) DEFAULT NULL,
  `b_head` varchar(100) DEFAULT NULL,
  `b_contact_number` varchar(15) DEFAULT NULL,
  `b_alt_number` varchar(15) DEFAULT NULL,
  `b_email` varchar(80) DEFAULT NULL,
  `b_commision` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_data`
--

INSERT INTO `branch_data` (`br_id`, `b_name`, `b_location`, `b_head`, `b_contact_number`, `b_alt_number`, `b_email`, `b_commision`) VALUES
(3, 'Sunrise Branch adsga', 'New York, NY', 'John Doe', '212-555-1234', '917-555-5678', 'sunrise@example.com', 0),
(4, 'Sunrise Branch 44', 'New York, NY', 'John Doe', '212-555-1234', '917-555-5678', 'sunrise@example.com', 0),
(5, 'Sunrise Branch 44', 'New York, NY', 'John Doe', '212-555-1234', '917-555-5678', 'sunrise@example.com', 0),
(6, 'Dispur Branch', 'Dispur Secretariat, Guwahati', 'Ms. P. Devi', '9435056789', NULL, 'dispur.branch@sample.net', 0),
(7, 'Sunrise Branch 44', 'New York, NY', 'John Doe', '212-555-1234', '917-555-5678', 'sunrise@example.com', 0),
(8, 'Sunrise Branch 44', 'New York, NY', 'John Doe', '212-555-1234', '917-555-5678', 'sunrise@example.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` bigint(20) NOT NULL,
  `client_name` varchar(200) DEFAULT NULL,
  `client_ref_no` varchar(200) NOT NULL,
  `client_contact` varchar(15) DEFAULT NULL,
  `client_alt_contact` varchar(15) DEFAULT NULL,
  `client_address` varchar(300) DEFAULT NULL,
  `client_email` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `client_name`, `client_ref_no`, `client_contact`, `client_alt_contact`, `client_address`, `client_email`) VALUES
(35, 'Wave Industries pvt. ltd.', 'JGCC0001', '9401069337', '456789123', '456 Oak Ave, Anytown, CA 91235', 'contact@betaind.net'),
(36, 'Wave Industries pvt. ltd.', 'JGCC0002', '555-555-5555', NULL, '456 Oak Ave, Anytown, CA 91235', 'contact@betaind.net'),
(37, 'Wave Industries pvt. ltd.', 'JGCC0003', '555-555-5555', NULL, '456 Oak Ave, Anytown, CA 91235', 'contact@betaind.net'),
(38, 'Wave Industries pvt. ltd.', 'JGCC0004', '555-555-5555', NULL, 'Dibrugarh, assam', 'contact@betaind.net'),
(39, 'Wave Industries pvt. ltd.', 'JGCC0005', '88008095', NULL, 'Dibrugarh, assam', 'contact@betaind.net'),
(40, 'Wave Industries pvt. ltd.', 'JGCC0006', '88008095', NULL, 'Dibrugarh, assam', 'contact@betaind.net'),
(41, 'Wave Industries pvt. ltd.', 'JGCC0007', '88008095', '9401069337', 'Dibrugarh, assam', 'contact@betaind.net'),
(42, 'Mintu Sharma', 'JGCC0008', '9401069337', '9401069337', 'siwan', 'msi2gmail@gaf.com'),
(43, 'Wave Industries pvt. ltd.', 'JGCC0009', '88008095', '9401069337', 'Dibrugarh, assam', 'contact@betaind.net'),
(44, 'Wave Industries pvt. ltd.', 'JGCC00010', '88008095', '9401069337', 'Dibrugarh, assam', 'contact@betaind.net'),
(45, 'Acme Corporation', 'ACME-2023-00d15', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', 'info@acmecorp.com'),
(46, 'Acme Corporation', 'ACME-2023-00d5', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', 'info@acmecorp.com'),
(47, 'Acme Corporation', 'ACME-2023-005', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', 'info@acmecorp.com'),
(50, 'Acme Corporation 2563', 'ACME-202376', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', 'info@acmecorp.com'),
(51, 'Acme Corporation 2563', 'ACME-202375', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', 'info@acmecorp.com'),
(52, 'Acme Corporation 2563', 'ACME-202374', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', 'info@acmecorp.com'),
(53, 'Acme Corporation 2563', 'ACME-202373', '555-100-1001', '555-200-2001', '100 Industry Lane, Anytown', 'info@acmecorp.com');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `col_id` int(155) NOT NULL,
  `col_amount` varchar(55) DEFAULT NULL,
  `col_mode` varchar(55) DEFAULT NULL,
  `col_remark` varchar(255) DEFAULT NULL,
  `col_date` varchar(20) DEFAULT NULL,
  `col_project_id` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`col_id`, `col_amount`, `col_mode`, `col_remark`, `col_date`, `col_project_id`) VALUES
(2, '1500', 'Bank Transfer', 'Advance payment for materials', '2023-10-26', 'JGCP0005'),
(3, '1500', 'Bank Transfer', 'Advance payment for materials', '2023-10-26', 'JGCP0005'),
(4, '1500', 'Bank Transfer', 'Advance payment for materials', '2023-10-26', 'PRJ1001'),
(5, '1500', 'Bank Transfer', 'Advance payment for materials', '2023-10-26', 'PRJ1001'),
(6, '1500', 'Bank Transfer', 'Advance payment for materials', '2023-10-26', 'PRJ1001'),
(7, '5000', 'upi', '', '2025-04-06', '35'),
(8, '1500', 'Bank Transfer', 'Advance payment for materials', '2023-10-26', 'PRJ1001'),
(9, '1500', 'Bank Transfer', 'Advance payment for materials', '2023-10-26', 'PRJ1001');

-- --------------------------------------------------------

--
-- Table structure for table `contractors`
--

CREATE TABLE `contractors` (
  `con_id` int(20) NOT NULL,
  `con_name` varchar(200) DEFAULT NULL,
  `con_contact` varchar(20) DEFAULT NULL,
  `con_alt_contact` varchar(20) DEFAULT NULL,
  `con_address` varchar(300) DEFAULT NULL,
  `con_email` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contractors`
--

INSERT INTO `contractors` (`con_id`, `con_name`, `con_contact`, `con_alt_contact`, `con_address`, `con_email`) VALUES
(1, 'Alice Johnson', '555', '555', '123 Main St, Anytown, CA 91234', 'alice.johnson@example.com'),
(2, 'Alice Johnson', '2147483647', '2147483647', '123 Main St, Anytown, CA 91234', 'alice.johnson@example.com'),
(5, 'Alice Johnson', '555', '555', '123 Main St, Anytown, CA 91234', 'alice.johnson@example.com'),
(6, 'Alice Johnson', '555', '555', '123 Main St, Anytown, CA 91234', 'alice.johnson@example.com'),
(7, 'Alice Johnson', '555', '555', '123 Main St, Anytown, CA 91234', 'alice.johnson@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `contractor_payments`
--

CREATE TABLE `contractor_payments` (
  `pay_id` int(20) NOT NULL,
  `pay_con_id` int(20) DEFAULT NULL,
  `pay_project_id` bigint(20) DEFAULT NULL,
  `pay_amount` varchar(50) DEFAULT NULL,
  `pay_mode` varchar(155) DEFAULT NULL,
  `pay_note` varchar(255) DEFAULT NULL,
  `pay_exp_id` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contractor_payments`
--

INSERT INTO `contractor_payments` (`pay_id`, `pay_con_id`, `pay_project_id`, `pay_amount`, `pay_mode`, `pay_note`, `pay_exp_id`) VALUES
(29, 1, 9, '78574', NULL, '2485', 20),
(30, 5, 9, '4574', NULL, '748574', 20),
(31, 2, 9, '4574', NULL, '748574', 20),
(32, 1, 9, '78574', NULL, '2485', 21),
(33, 2, 9, '4574', NULL, '748574', 21),
(34, 5, 9, '4574', NULL, '748574', 21),
(35, 5, 9, '4574', 'UPI', '748574', 23),
(36, 1, 9, '78574', 'UPI', '2485', 23),
(37, 2, 9, '4574', 'UPI', '748574', 23),
(50, 2, 9, '30000', 'UPI', 'for arun da ', 28),
(53, 2, 9, '30000', 'UPI', 'for arun da ', 29),
(56, 2, 9, '30000', 'UPI', 'for arun da ', 30),
(57, 2, 9, '30000', 'UPI', 'for arun da ', 31),
(58, 2, 9, '30000', 'UPI', 'for arun da ', 32),
(61, 2, 9, '30000', 'UPI', 'for arun da ', 35),
(62, 2, 9, '30000', 'UPI', 'for arun da ', 36),
(63, 2, 9, '30000', NULL, 'for arun da ', NULL),
(64, 2, 9, '30000', NULL, 'for arun da ', NULL),
(66, 2, 9, '30000', NULL, 'for arun da ', NULL),
(99, 5, 11, '500', NULL, 'asdasdf', 24),
(100, 2, 10, '10000', NULL, 'adfgasdg', 25),
(101, 2, 9, '30000', NULL, 'for arun da ', 9),
(104, 2, 9, '30000', NULL, 'for arun da ', 10),
(111, 2, 9, '30000', 'UPI', 'for arun da ', 37),
(114, 2, 9, '30000', 'UPI', 'for arun da ', 39),
(115, 2, 9, '30000', NULL, 'for arun da ', 11);

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `exp_id` int(155) NOT NULL,
  `exp_name` varchar(255) DEFAULT NULL,
  `exp_amount` varchar(55) DEFAULT NULL,
  `exp_mode` varchar(55) DEFAULT NULL,
  `exp_remark` varchar(255) DEFAULT NULL,
  `exp_date` varchar(11) DEFAULT NULL,
  `exp_category` varchar(155) DEFAULT NULL,
  `exp_project_ref` varchar(155) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`exp_id`, `exp_name`, `exp_amount`, `exp_mode`, `exp_remark`, `exp_date`, `exp_category`, `exp_project_ref`, `created_at`) VALUES
(2, 'Material Purchase', '2500', 'Credit Card', 'Purchase of cement and bricks', '2023-10-26', 'Construction Materials', 'JGCP0005', '2025-03-24 11:54:40'),
(3, 'Material Purchase', '2500', 'Credit Card', 'Purchase of cement and bricks', '2023-10-26', 'Construction Materials', 'JGCP0005', '2025-03-24 11:54:40'),
(4, 'Material Purchase', '2500', 'Credit Card', 'Purchase of cement and bricks', '2023-10-26', 'Construction Materials', 'JGCP0005', '2025-03-24 11:54:40'),
(5, 'Material Purchase', '2500', 'Credit Card', 'Purchase of cement and bricks', '2023-10-26', 'Construction Materials', 'PRJ1001', '2025-03-24 11:54:40'),
(6, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-03-29 13:31:50'),
(7, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-03-29 13:33:24'),
(9, NULL, NULL, NULL, NULL, NULL, 'Project', NULL, '2025-03-29 13:37:59'),
(10, NULL, NULL, NULL, NULL, NULL, 'Project', NULL, '2025-03-29 13:38:41'),
(11, 'march expense kkl', '20000', 'Cash', 'Bob da record 785', '2025-04-25', 'Project', NULL, '2025-03-29 13:41:36'),
(12, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-03-29 13:42:03'),
(13, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-03-29 13:42:04'),
(14, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-03-29 13:44:03'),
(15, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-03-29 14:54:47'),
(16, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-03-29 14:56:15'),
(17, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-04-03 04:56:02'),
(18, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-04-03 05:08:18'),
(19, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-04-03 05:08:35'),
(20, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-04-03 05:09:19'),
(21, 'name sd', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-04-03 05:19:37'),
(22, 'new dhoni expense', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-05-08 05:02:51'),
(23, 'new dhoni expense', '63452', 'UPI', 'dfdrvds', '2025-03-16', 'Project', NULL, '2025-05-08 05:04:00'),
(24, NULL, NULL, NULL, NULL, NULL, 'Project', NULL, '2025-05-10 14:30:46'),
(25, NULL, NULL, NULL, NULL, NULL, 'Project', NULL, '2025-05-10 14:33:51'),
(26, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 14:34:45'),
(27, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 14:36:10'),
(28, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 14:37:30'),
(29, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 14:38:33'),
(30, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 14:41:00'),
(31, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 14:42:37'),
(32, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 14:43:22'),
(33, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 15:05:30'),
(34, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 15:05:37'),
(35, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 15:06:15'),
(36, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-10 15:07:06'),
(37, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-11 08:05:36'),
(38, 'Material Purchase', '2500', 'Credit Card', 'Purchase of cement and bricks', '2023-10-26', 'Construction Materials', 'Supplier A', '2025-05-11 08:05:36'),
(39, 'march expense 1', '20000', 'UPI', 'Bob da record', '2025-04-25', 'Project', NULL, '2025-05-11 08:06:52'),
(40, 'Material Purchase', '2500', 'Credit Card', 'Purchase of cement and bricks', '2023-10-26', 'Construction Materials', 'Supplier A', '2025-05-11 08:06:52');

-- --------------------------------------------------------

--
-- Table structure for table `expense_item`
--

CREATE TABLE `expense_item` (
  `exp_item_id` int(20) NOT NULL,
  `exp_item_name` varchar(255) DEFAULT NULL,
  `exp_item_quantity` varchar(255) DEFAULT NULL,
  `exp_item_rate` varchar(255) DEFAULT NULL,
  `exp_ref_id` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense_item`
--

INSERT INTO `expense_item` (`exp_item_id`, `exp_item_name`, `exp_item_quantity`, `exp_item_rate`, `exp_ref_id`) VALUES
(2, 'Cement Bags', '100', '10.5', 2),
(3, 'Cement Bags', '100', '10.5', 2),
(4, 'Cement Bags', '100', '10.5', 2),
(5, 'Cement Bags', '100', '10.5', 2),
(6, 'Cement Bags', '100', '10.5', 2);

-- --------------------------------------------------------

--
-- Table structure for table `finance_dep`
--

CREATE TABLE `finance_dep` (
  `fd_id` int(11) NOT NULL,
  `fd_name` varchar(100) NOT NULL,
  `fd_contact` varchar(13) NOT NULL,
  `fd_alt_contact` varchar(13) DEFAULT NULL,
  `fd_address` varchar(300) DEFAULT NULL,
  `fd_email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `finance_dep_auth`
--

CREATE TABLE `finance_dep_auth` (
  `fd_a_id` int(11) NOT NULL,
  `fd_r_id` int(11) NOT NULL,
  `fd_user_id` varchar(100) DEFAULT NULL,
  `fd_password` varchar(255) NOT NULL,
  `fd_token` varchar(455) NOT NULL,
  `fd_isactive` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` bigint(20) NOT NULL,
  `invoice_no` varchar(50) DEFAULT NULL,
  `invoice_date` varchar(20) DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT NULL,
  `amount` varchar(50) DEFAULT NULL,
  `gst_rate` varchar(50) DEFAULT NULL,
  `discount` varchar(50) DEFAULT NULL,
  `total` varchar(50) DEFAULT NULL,
  `client_contact` varchar(50) DEFAULT NULL,
  `client_address` varchar(50) DEFAULT NULL,
  `client_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_no`, `invoice_date`, `payment_status`, `amount`, `gst_rate`, `discount`, `total`, `client_contact`, `client_address`, `client_id`, `created_at`) VALUES
(1, 'INV-2024-001', '2024-05-06', 'unpaid', '10000', '18', '500', '11300', '9876543210', 'Guwahati, Assam', 101, '2025-05-11 08:05:36');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `invoice_item_id` bigint(20) NOT NULL,
  `inv_item_name` varchar(155) DEFAULT NULL,
  `inv_item_quantity` varchar(50) DEFAULT NULL,
  `inv_item_rate` varchar(50) DEFAULT NULL,
  `inv_item_amount` varchar(50) DEFAULT NULL,
  `invoice_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`invoice_item_id`, `inv_item_name`, `inv_item_quantity`, `inv_item_rate`, `inv_item_amount`, `invoice_id`) VALUES
(0, 'Steel Rod', '10', '100', '1000', 1),
(0, 'Cement Bag', '20', '200', '4000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `labours`
--

CREATE TABLE `labours` (
  `lab_id` int(20) NOT NULL,
  `lab_name` varchar(200) DEFAULT NULL,
  `lab_contact` varchar(20) DEFAULT NULL,
  `lab_alt_contact` varchar(20) DEFAULT NULL,
  `lab_address` varchar(300) DEFAULT NULL,
  `lab_email` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `labours`
--

INSERT INTO `labours` (`lab_id`, `lab_name`, `lab_contact`, `lab_alt_contact`, `lab_address`, `lab_email`) VALUES
(1, 'Quantum Diagnosasdasdftics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(3, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(4, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(5, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(6, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(7, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(8, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(9, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(10, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(11, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com'),
(12, 'Quantum Diagnostics Lab', '1', '1', '123 Innovation Drive, Anytown, CA 91234, USA', 'info@quantumdiagnosticslab.com');

-- --------------------------------------------------------

--
-- Table structure for table `material_item_list`
--

CREATE TABLE `material_item_list` (
  `mr_item_id` bigint(20) NOT NULL,
  `mr_r_id` bigint(20) DEFAULT NULL,
  `mr_project_r_id` bigint(20) NOT NULL,
  `mr_item_name` varchar(255) DEFAULT NULL,
  `mr_item_quantity` varchar(55) DEFAULT NULL,
  `mr_item_amount` varchar(55) DEFAULT NULL,
  `mr_item_date` varchar(20) DEFAULT NULL,
  `md_approval` tinyint(1) DEFAULT 0,
  `fd_approval` tinyint(1) DEFAULT 0,
  `vendor_id` int(155) DEFAULT NULL,
  `mr_delivery_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_item_list`
--

INSERT INTO `material_item_list` (`mr_item_id`, `mr_r_id`, `mr_project_r_id`, `mr_item_name`, `mr_item_quantity`, `mr_item_amount`, `mr_item_date`, `md_approval`, `fd_approval`, `vendor_id`, `mr_delivery_status`) VALUES
(37, 13, 11, 'Cement', '20', NULL, NULL, 0, 0, NULL, 0),
(38, 13, 11, 'atta', '20', NULL, NULL, 0, 0, NULL, 0),
(39, 13, 11, 'Cement', '20', NULL, NULL, 0, 0, NULL, 0),
(40, 13, 11, 'atta', '20', NULL, NULL, 0, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `material_requests`
--

CREATE TABLE `material_requests` (
  `mr_r_id` bigint(20) NOT NULL,
  `material_ref_no` varchar(55) DEFAULT NULL,
  `mr_project_id` bigint(20) DEFAULT NULL,
  `mr_phase` varchar(155) DEFAULT NULL,
  `mr_date` varchar(55) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_requests`
--

INSERT INTO `material_requests` (`mr_r_id`, `material_ref_no`, `mr_project_id`, `mr_phase`, `mr_date`, `created_at`) VALUES
(1, 'JGCMRQ0001', 12, 'installment', '<date>', '2025-04-05 13:13:06'),
(9, NULL, 9, 'Phase 1', '2025-04-03', '2025-04-06 13:42:03'),
(10, 'JGCMRQ0001', 9, 'Phase 1', '2025-04-03', '2025-04-06 13:48:40'),
(11, 'JGCMRQ0002', 9, 'Phase 1', '2025-04-03', '2025-04-06 13:49:59'),
(12, 'JGCMRQ0003', 9, 'Phase 1', '2025-04-03', '2025-04-08 02:04:00'),
(13, 'JGCMRQ0004', 11, 'Phase 1', '2025-04-03', '2025-05-11 08:05:36'),
(14, 'JGCMRQ0005', 11, 'Phase 1', '2025-04-03', '2025-05-11 08:06:53');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('info','warning','error','success','system') NOT NULL DEFAULT 'info',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_recipients`
--

CREATE TABLE `notification_recipients` (
  `id` int(11) NOT NULL,
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `read_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `particles`
--

CREATE TABLE `particles` (
  `particle_id` int(20) NOT NULL,
  `particle_name` varchar(200) DEFAULT NULL,
  `particle_price` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `particles`
--

INSERT INTO `particles` (`particle_id`, `particle_name`, `particle_price`) VALUES
(5, 'particles_name1', '2000'),
(6, 'particles_name1', '2000'),
(7, 'particles_name1', '2000'),
(8, 'particles_name1', '2000');

-- --------------------------------------------------------

--
-- Table structure for table `phases`
--

CREATE TABLE `phases` (
  `phase_id` int(11) NOT NULL,
  `phase_name` varchar(100) DEFAULT NULL,
  `phase_alt_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phases`
--

INSERT INTO `phases` (`phase_id`, `phase_name`, `phase_alt_name`) VALUES
(2, 'Phase 2', 'sub_phase_ascmigv'),
(3, 'Phase 33', 'phase_alt_name 1'),
(4, 'Phase 44', 'phase_alt_name 1'),
(5, 'Phase 44', 'phase_alt_name 1'),
(6, 'Phase 44', 'phase_alt_name 1'),
(7, 'Phase 44', 'phase_alt_name 1'),
(8, 'Phase 44', 'phase_alt_name 1'),
(9, 'Phase 44', 'phase_alt_name 1'),
(10, 'Phase 44', 'phase_alt_name 1');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `pro_id` bigint(20) NOT NULL,
  `pro_client_r_id` bigint(20) NOT NULL,
  `pro_name` varchar(200) DEFAULT NULL,
  `pro_ref_no` varchar(200) NOT NULL,
  `pro_housetype` varchar(100) DEFAULT NULL,
  `pro_rcctype` varchar(100) DEFAULT NULL,
  `pro_sitedesc` varchar(300) DEFAULT NULL,
  `pro_duration` varchar(100) DEFAULT NULL,
  `pro_totalcost` bigint(20) DEFAULT NULL,
  `pro_advancepayment` int(11) DEFAULT NULL,
  `pro_own` varchar(55) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`pro_id`, `pro_client_r_id`, `pro_name`, `pro_ref_no`, `pro_housetype`, `pro_rcctype`, `pro_sitedesc`, `pro_duration`, `pro_totalcost`, `pro_advancepayment`, `pro_own`, `created_at`) VALUES
(9, 35, 'Lakeview Resort', 'JGCP0002', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(10, 35, 'Lakeview Resort', 'JGCP0003', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(11, 35, 'Lakeview Resort', 'JGCP0004', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(12, 35, 'Lakeview Resort', 'JGCP0005', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(13, 35, 'Lakeview Resort', 'JGCP0006', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(14, 35, 'Lakeview Resort', 'JGCP0007', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(15, 35, 'Lakeview Resort', 'JGCP0008', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(16, 35, 'Lakeview Resort', 'JGCP0009', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(18, 35, 'Lakeview Resort', 'JGCP00011', 'Bungalow Resort', 'Timber and Stone', 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-04-05 13:13:56'),
(19, 38, 'Lakeview Resort', 'JGCP00012', 'Bungalow Resort', NULL, 'Scenic lakefront, hilly terrain.', '15 months', 1800000, 540000, NULL, '2025-05-11 08:05:36'),
(20, 35, 'Acme Corporation', 'ACME-2023-0015', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, NULL, '2025-05-16 12:14:04'),
(21, 45, 'Acme Corporation', 'ACME-2023-00d15', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, NULL, '2025-05-16 12:16:37'),
(22, 46, 'Acme Corporation', 'ACME-2023-00d5', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, NULL, '2025-05-16 12:23:22'),
(23, 47, 'Acme Corporation', 'ACME-2023-005', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, NULL, '2025-05-16 12:24:03'),
(24, 50, 'Acme Corporation 2563', 'ACME-202376', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, '[object Object]', '2025-05-19 07:03:07'),
(25, 51, 'Acme Corporation 2563', 'ACME-202375', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, NULL, '2025-05-19 07:04:00'),
(26, 52, 'Acme Corporation 2563', 'ACME-202374', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, NULL, '2025-05-19 07:05:02'),
(27, 53, 'Acme Corporation 2563', 'ACME-202373', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, 'Sunrise Branch adsga', '2025-05-19 07:05:40'),
(28, 36, 'Acme Corporation 2563', 'ACME-202372', 'Warehouse', 'Pre-engineered Steel', 'Large open area, flat terrain.', '6 months', 500000, 150000, 'Sunrise Branch adsga', '2025-05-24 08:33:38');

-- --------------------------------------------------------

--
-- Table structure for table `project_contractor`
--

CREATE TABLE `project_contractor` (
  `pro_con_id` bigint(20) NOT NULL,
  `pro_id` bigint(20) NOT NULL,
  `con_id` int(20) DEFAULT NULL,
  `pro_phase` varchar(255) DEFAULT NULL,
  `pro_sub_phase` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_contractor`
--

INSERT INTO `project_contractor` (`pro_con_id`, `pro_id`, `con_id`, `pro_phase`, `pro_sub_phase`) VALUES
(3, 9, 5, 'Phase 1', 'Subphase A'),
(4, 9, 5, 'Phase 1', 'Subphase A');

-- --------------------------------------------------------

--
-- Table structure for table `project_docs`
--

CREATE TABLE `project_docs` (
  `pro_doc_id` int(11) NOT NULL,
  `pro_r_id` bigint(20) NOT NULL,
  `pro_doc_url` varchar(200) NOT NULL,
  `pro_doc_name` varchar(155) DEFAULT NULL,
  `pro_doc_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_docs`
--

INSERT INTO `project_docs` (`pro_doc_id`, `pro_r_id`, `pro_doc_url`, `pro_doc_name`, `pro_doc_type`) VALUES
(3, 9, 'public/project/files/file-86ca5128-2b99-44c4-8e87-9b029b805b41-1747033432513.pdf', NULL, '0'),
(7, 9, 'public/project/files/file-f0aa20a7-4a43-4a85-b32b-2adb1369d79f-1747034744129.pdf', NULL, NULL),
(8, 9, 'public/project/files/file-6f2e0810-4d9b-4ee8-a087-303faea57edc-1747034744280.pdf', NULL, NULL),
(9, 9, 'public/project/files/file-7c36bbaa-867b-4294-971b-48277fe7897a-1747034744352.pdf', NULL, NULL),
(10, 9, 'public/project/files/file-470b5035-2187-43b5-afe4-0c24e0a0df7f-1747034744493.pdf', NULL, NULL),
(11, 9, 'public/project/files/file-bb095eba-bb46-4011-b883-6708e6f05339-1747034744592.pdf', NULL, NULL),
(13, 9, 'public/project/images/image-34a17113-af97-4cc2-a081-60dab46dfa57-1747035464281.jpg', NULL, NULL),
(14, 9, 'public/project/images/image-3ede4f51-4719-43b8-8303-c066bfda3732-1747631257823.jpg', 'WhatsApp Image  at', 'doc_image');

-- --------------------------------------------------------

--
-- Table structure for table `project_phase`
--

CREATE TABLE `project_phase` (
  `pro_phase_id` int(20) NOT NULL,
  `phase_id` int(155) NOT NULL,
  `pro_id` bigint(20) NOT NULL,
  `pro_phase_status` varchar(255) NOT NULL,
  `pro_phase_deadline` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_phase`
--

INSERT INTO `project_phase` (`pro_phase_id`, `phase_id`, `pro_id`, `pro_phase_status`, `pro_phase_deadline`, `created_at`) VALUES
(5, 3, 9, 'In-progsress', '2025-06-30', '2025-05-09 16:09:11'),
(6, 3, 9, 'Completed', '2025-06-30', '2025-05-09 17:03:06'),
(7, 3, 9, 'Not Started', '2025-06-30', '2025-05-09 17:03:15'),
(8, 3, 9, 'Not Started', '2025-06-30', '2025-05-10 14:03:34'),
(9, 3, 9, 'Not Started', '2025-06-30', '2025-05-11 08:05:36');

-- --------------------------------------------------------

--
-- Table structure for table `project_subphase`
--

CREATE TABLE `project_subphase` (
  `pro_subphase_id` int(20) NOT NULL,
  `pro_id` bigint(20) NOT NULL,
  `pro_phase` int(20) DEFAULT NULL,
  `pro_subphase` varchar(255) DEFAULT NULL,
  `deadline` varchar(155) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_subphase`
--

INSERT INTO `project_subphase` (`pro_subphase_id`, `pro_id`, `pro_phase`, `pro_subphase`, `deadline`, `created_at`) VALUES
(2, 9, 6, 'Subphase A', '2025-07-15', '2025-05-09 17:03:37'),
(3, 9, 6, 'Subphase A', '2025-07-15', '2025-05-09 17:03:37'),
(4, 9, 7, 'Subphase A', '2025-07-15', '2025-05-09 17:03:40'),
(5, 9, 7, 'Subphase A', '2025-07-15', '2025-05-11 08:05:36');

-- --------------------------------------------------------

--
-- Table structure for table `sub_phases`
--

CREATE TABLE `sub_phases` (
  `sub_phase_id` int(11) NOT NULL,
  `sub_phase_name` varchar(100) DEFAULT NULL,
  `sub_phase_alt_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_phases`
--

INSERT INTO `sub_phases` (`sub_phase_id`, `sub_phase_name`, `sub_phase_alt_name`) VALUES
(2, 'Phase 2', 'sub_phase_alt_name 1kldrjkgscmigv'),
(3, 'Phase 1', 'sub_phase_alt_name 1'),
(4, 'Phase 1', 'sub_phase_alt_name 1'),
(5, 'Phase 1', 'sub_phase_alt_name 1'),
(6, 'Phase 1', 'sub_phase_alt_name 1'),
(7, 'Phase 1', 'sub_phase_alt_name 1'),
(8, 'Phase 1', 'sub_phase_alt_name 1'),
(9, 'Phase 1', 'sub_phase_alt_name 1'),
(10, 'Phase 1', 'sub_phase_alt_name 1'),
(11, 'Phase 1', 'sub_phase_alt_name 1'),
(12, 'Phase 1', 'sub_phase_alt_name 1'),
(13, 'Phase 1', 'sub_phase_alt_name 1'),
(14, 'Phase 1', 'sub_phase_alt_name 1'),
(15, 'Phase 1', 'sub_phase_alt_name 1');

-- --------------------------------------------------------

--
-- Table structure for table `superviser`
--

CREATE TABLE `superviser` (
  `sup_id` int(11) NOT NULL,
  `sup_name` varchar(100) NOT NULL,
  `sup_email` varchar(155) DEFAULT NULL,
  `sup_contact` varchar(13) NOT NULL,
  `sup_alt_contact` varchar(13) DEFAULT NULL,
  `sup_address` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `superviser`
--

INSERT INTO `superviser` (`sup_id`, `sup_name`, `sup_email`, `sup_contact`, `sup_alt_contact`, `sup_address`) VALUES
(1, 'Acme Supplies', NULL, '9401069337', '789456123', '123 Main St, Anytown, CA 91234'),
(3, 'Supervise Supplies', NULL, '555-123-4567', '555-987-6543', '123 Main St, Anytown, CA 91234'),
(4, 'Supervise Supplies', NULL, '555-123-4567', '555-987-6543', '123 Main St, Anytown, CA 91234'),
(5, 'Supervise Supplies', NULL, '555-123-4567', '555-987-6543', '123 Main St, Anytown, CA 91234'),
(6, 'Supervise Supplies', NULL, '555-123-4567', '555-987-6543', '123 Main St, Anytown, CA 91234'),
(7, 'Supervise Supplies', NULL, '555-123-4567', '555-987-6543', '123 Main St, Anytown, CA 91234'),
(8, 'Supervise Supplies', NULL, '555-123-4567', '555-987-6543', '123 Main St, Anytown, CA 91234');

-- --------------------------------------------------------

--
-- Table structure for table `superviser_auth`
--

CREATE TABLE `superviser_auth` (
  `sup_a_id` int(11) NOT NULL,
  `sup_r_id` int(11) NOT NULL,
  `sup_user_id` varchar(100) NOT NULL,
  `sup_password` varchar(300) NOT NULL,
  `sup_token` varchar(300) DEFAULT NULL,
  `sup_isactive` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `su_id` int(11) NOT NULL,
  `su_name` varchar(200) DEFAULT NULL,
  `su_email` varchar(155) DEFAULT NULL,
  `su_contact` varchar(15) DEFAULT NULL,
  `su_alt_contact` varchar(155) DEFAULT NULL,
  `su_address` varchar(155) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super_admin`
--

INSERT INTO `super_admin` (`su_id`, `su_name`, `su_email`, `su_contact`, `su_alt_contact`, `su_address`) VALUES
(6, 'msi', 'msiadga@gmail.com', '9401069887', '7777777', NULL),
(7, 'John Doe', NULL, '9401069337', NULL, NULL),
(13, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(15, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(16, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(17, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(18, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(19, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(20, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(21, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati'),
(22, 'Admin Sharma', 'admin.sharma@example.com', '9876500000', '8765400000', 'Super Admin HQ, Guwahati');

-- --------------------------------------------------------

--
-- Table structure for table `super_admin_auth`
--

CREATE TABLE `super_admin_auth` (
  `su_a_id` int(11) NOT NULL,
  `su_r_id` int(11) NOT NULL,
  `su_user_id` varchar(80) DEFAULT NULL,
  `su_password` varchar(300) DEFAULT NULL,
  `su_token` varchar(400) DEFAULT NULL,
  `su_isactive` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super_admin_auth`
--

INSERT INTO `super_admin_auth` (`su_a_id`, `su_r_id`, `su_user_id`, `su_password`, `su_token`, `su_isactive`) VALUES
(6, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTc0NzM5ODk3MSwiZXhwIjoxNzQ5OTkwOTcxfQ.IzMFEBbQASyFBejmhUT0ODE0YEX0xIHUeznBoGrEUyc', 1),
(7, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(8, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(9, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(10, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(11, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(12, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(13, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(14, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(15, 7, 'deka@example.com', '$2a$12$aIwIqfY2u58c2U846bxcHeGw1qfMq1AaLGuBYNjhVtLVr.7N3QNkm', NULL, 1),
(16, 22, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendor_id` int(20) NOT NULL,
  `vendor_ref_no` varchar(155) DEFAULT NULL,
  `vendor_name` varchar(200) DEFAULT NULL,
  `vendor_contact` varchar(20) DEFAULT NULL,
  `vendor_alt_contact` varchar(20) DEFAULT NULL,
  `vendor_address` varchar(300) DEFAULT NULL,
  `vendor_email` varchar(80) DEFAULT NULL,
  `vendor_status` varchar(80) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendor_id`, `vendor_ref_no`, `vendor_name`, `vendor_contact`, `vendor_alt_contact`, `vendor_address`, `vendor_email`, `vendor_status`) VALUES
(14, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(16, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(17, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(18, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(19, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(20, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(21, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(22, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(23, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(24, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(25, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(26, 'JGCV0001', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(27, 'JGCV0002', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(28, 'JGCV0003', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(29, 'JGCV0004', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'JGCV0005', NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'JGCV0006', 'ABC Supplies', '2147483647', '1234567890', '123 Supply St, City, Country', 'contact@abcsupplies.com', 'open'),
(32, 'JGCV0007', NULL, NULL, NULL, NULL, NULL, 'open');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_payments`
--

CREATE TABLE `vendor_payments` (
  `pay_id` int(20) NOT NULL,
  `pay_vendor_id` int(20) DEFAULT NULL,
  `pay_project_id` bigint(20) DEFAULT NULL,
  `pay_amount` varchar(50) DEFAULT NULL,
  `pay_mode` varchar(155) DEFAULT NULL,
  `pay_note` varchar(255) DEFAULT NULL,
  `pay_exp_id` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor_payments`
--

INSERT INTO `vendor_payments` (`pay_id`, `pay_vendor_id`, `pay_project_id`, `pay_amount`, `pay_mode`, `pay_note`, `pay_exp_id`) VALUES
(27, 14, 11, '4574', NULL, '748574', 20),
(30, 14, 11, '4574', NULL, '748574', 21),
(143, NULL, 9, '50000', NULL, 'fo 3 truck red soil', 9),
(152, NULL, 9, '50000', NULL, 'fo 3 truck red soil', 10),
(176, NULL, 9, '50000', NULL, 'fo 3 truck red soil', 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch_auth`
--
ALTER TABLE `branch_auth`
  ADD PRIMARY KEY (`br_a_id`),
  ADD UNIQUE KEY `br_email` (`br_user_id`),
  ADD KEY `br_r_id` (`br_r_id`);

--
-- Indexes for table `branch_clients`
--
ALTER TABLE `branch_clients`
  ADD PRIMARY KEY (`b_client_id`),
  ADD UNIQUE KEY `un_client_refno` (`b_client_ref_no`),
  ADD KEY `b_r_id` (`b_r_id`);

--
-- Indexes for table `branch_data`
--
ALTER TABLE `branch_data`
  ADD PRIMARY KEY (`br_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `un_client` (`client_ref_no`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`col_id`);

--
-- Indexes for table `contractors`
--
ALTER TABLE `contractors`
  ADD PRIMARY KEY (`con_id`);

--
-- Indexes for table `contractor_payments`
--
ALTER TABLE `contractor_payments`
  ADD PRIMARY KEY (`pay_id`),
  ADD KEY `pay_con_id` (`pay_con_id`),
  ADD KEY `contractor_payments_ibfk_2` (`pay_project_id`),
  ADD KEY `pay_exp_id` (`pay_exp_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`exp_id`);

--
-- Indexes for table `expense_item`
--
ALTER TABLE `expense_item`
  ADD PRIMARY KEY (`exp_item_id`),
  ADD KEY `exp_ref_id` (`exp_ref_id`);

--
-- Indexes for table `finance_dep`
--
ALTER TABLE `finance_dep`
  ADD PRIMARY KEY (`fd_id`);

--
-- Indexes for table `finance_dep_auth`
--
ALTER TABLE `finance_dep_auth`
  ADD PRIMARY KEY (`fd_a_id`),
  ADD UNIQUE KEY `un_fd_mail` (`fd_user_id`),
  ADD KEY `fd_r_id` (`fd_r_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indexes for table `labours`
--
ALTER TABLE `labours`
  ADD PRIMARY KEY (`lab_id`);

--
-- Indexes for table `material_item_list`
--
ALTER TABLE `material_item_list`
  ADD PRIMARY KEY (`mr_item_id`),
  ADD KEY `material_item_list_ibfk_1` (`mr_project_r_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `material_requests`
--
ALTER TABLE `material_requests`
  ADD PRIMARY KEY (`mr_r_id`),
  ADD KEY `mr_project_id` (`mr_project_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_recipients`
--
ALTER TABLE `notification_recipients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_id` (`notification_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `particles`
--
ALTER TABLE `particles`
  ADD PRIMARY KEY (`particle_id`);

--
-- Indexes for table `phases`
--
ALTER TABLE `phases`
  ADD PRIMARY KEY (`phase_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`pro_id`),
  ADD UNIQUE KEY `un_project` (`pro_ref_no`),
  ADD KEY `pro_client_r_id` (`pro_client_r_id`);

--
-- Indexes for table `project_contractor`
--
ALTER TABLE `project_contractor`
  ADD PRIMARY KEY (`pro_con_id`),
  ADD KEY `con_id` (`con_id`),
  ADD KEY `pro_id` (`pro_id`);

--
-- Indexes for table `project_docs`
--
ALTER TABLE `project_docs`
  ADD PRIMARY KEY (`pro_doc_id`),
  ADD KEY `cl_r_id` (`pro_r_id`);

--
-- Indexes for table `project_phase`
--
ALTER TABLE `project_phase`
  ADD PRIMARY KEY (`pro_phase_id`),
  ADD KEY `pro_id` (`pro_id`),
  ADD KEY `phase_id` (`phase_id`);

--
-- Indexes for table `project_subphase`
--
ALTER TABLE `project_subphase`
  ADD PRIMARY KEY (`pro_subphase_id`),
  ADD KEY `pro_phase` (`pro_phase`);

--
-- Indexes for table `sub_phases`
--
ALTER TABLE `sub_phases`
  ADD PRIMARY KEY (`sub_phase_id`);

--
-- Indexes for table `superviser`
--
ALTER TABLE `superviser`
  ADD PRIMARY KEY (`sup_id`);

--
-- Indexes for table `superviser_auth`
--
ALTER TABLE `superviser_auth`
  ADD PRIMARY KEY (`sup_a_id`),
  ADD KEY `sup_r_id` (`sup_r_id`);

--
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`su_id`);

--
-- Indexes for table `super_admin_auth`
--
ALTER TABLE `super_admin_auth`
  ADD PRIMARY KEY (`su_a_id`),
  ADD KEY `su_r_id` (`su_r_id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendor_id`);

--
-- Indexes for table `vendor_payments`
--
ALTER TABLE `vendor_payments`
  ADD PRIMARY KEY (`pay_id`),
  ADD KEY `pay_vendor_id` (`pay_vendor_id`),
  ADD KEY `pay_client_id` (`pay_project_id`),
  ADD KEY `pay_exp_id` (`pay_exp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch_auth`
--
ALTER TABLE `branch_auth`
  MODIFY `br_a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `branch_clients`
--
ALTER TABLE `branch_clients`
  MODIFY `b_client_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `branch_data`
--
ALTER TABLE `branch_data`
  MODIFY `br_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `col_id` int(155) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contractors`
--
ALTER TABLE `contractors`
  MODIFY `con_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contractor_payments`
--
ALTER TABLE `contractor_payments`
  MODIFY `pay_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `exp_id` int(155) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `expense_item`
--
ALTER TABLE `expense_item`
  MODIFY `exp_item_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `finance_dep`
--
ALTER TABLE `finance_dep`
  MODIFY `fd_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `finance_dep_auth`
--
ALTER TABLE `finance_dep_auth`
  MODIFY `fd_a_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `labours`
--
ALTER TABLE `labours`
  MODIFY `lab_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `material_item_list`
--
ALTER TABLE `material_item_list`
  MODIFY `mr_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `material_requests`
--
ALTER TABLE `material_requests`
  MODIFY `mr_r_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_recipients`
--
ALTER TABLE `notification_recipients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `particles`
--
ALTER TABLE `particles`
  MODIFY `particle_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `phases`
--
ALTER TABLE `phases`
  MODIFY `phase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `pro_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `project_contractor`
--
ALTER TABLE `project_contractor`
  MODIFY `pro_con_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `project_docs`
--
ALTER TABLE `project_docs`
  MODIFY `pro_doc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `project_phase`
--
ALTER TABLE `project_phase`
  MODIFY `pro_phase_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `project_subphase`
--
ALTER TABLE `project_subphase`
  MODIFY `pro_subphase_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sub_phases`
--
ALTER TABLE `sub_phases`
  MODIFY `sub_phase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `superviser`
--
ALTER TABLE `superviser`
  MODIFY `sup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `superviser_auth`
--
ALTER TABLE `superviser_auth`
  MODIFY `sup_a_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `super_admin`
--
ALTER TABLE `super_admin`
  MODIFY `su_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `super_admin_auth`
--
ALTER TABLE `super_admin_auth`
  MODIFY `su_a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `vendor_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `vendor_payments`
--
ALTER TABLE `vendor_payments`
  MODIFY `pay_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch_auth`
--
ALTER TABLE `branch_auth`
  ADD CONSTRAINT `branch_auth_ibfk_1` FOREIGN KEY (`br_r_id`) REFERENCES `branch_data` (`br_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `branch_clients`
--
ALTER TABLE `branch_clients`
  ADD CONSTRAINT `branch_clients_ibfk_1` FOREIGN KEY (`b_r_id`) REFERENCES `branch_data` (`br_id`) ON DELETE CASCADE;

--
-- Constraints for table `contractor_payments`
--
ALTER TABLE `contractor_payments`
  ADD CONSTRAINT `contractor_payments_ibfk_1` FOREIGN KEY (`pay_con_id`) REFERENCES `contractors` (`con_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contractor_payments_ibfk_2` FOREIGN KEY (`pay_project_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contractor_payments_ibfk_3` FOREIGN KEY (`pay_exp_id`) REFERENCES `expenses` (`exp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `expense_item`
--
ALTER TABLE `expense_item`
  ADD CONSTRAINT `expense_item_ibfk_1` FOREIGN KEY (`exp_ref_id`) REFERENCES `expenses` (`exp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `finance_dep_auth`
--
ALTER TABLE `finance_dep_auth`
  ADD CONSTRAINT `finance_dep_auth_ibfk_1` FOREIGN KEY (`fd_r_id`) REFERENCES `finance_dep` (`fd_id`);

--
-- Constraints for table `material_item_list`
--
ALTER TABLE `material_item_list`
  ADD CONSTRAINT `material_item_list_ibfk_1` FOREIGN KEY (`mr_project_r_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `material_item_list_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `material_requests`
--
ALTER TABLE `material_requests`
  ADD CONSTRAINT `material_requests_ibfk_1` FOREIGN KEY (`mr_project_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification_recipients`
--
ALTER TABLE `notification_recipients`
  ADD CONSTRAINT `notification_recipients_ibfk_1` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`pro_client_r_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE;

--
-- Constraints for table `project_contractor`
--
ALTER TABLE `project_contractor`
  ADD CONSTRAINT `project_contractor_ibfk_1` FOREIGN KEY (`con_id`) REFERENCES `contractors` (`con_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_contractor_ibfk_2` FOREIGN KEY (`pro_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_docs`
--
ALTER TABLE `project_docs`
  ADD CONSTRAINT `project_docs_ibfk_1` FOREIGN KEY (`pro_r_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_phase`
--
ALTER TABLE `project_phase`
  ADD CONSTRAINT `project_phase_ibfk_1` FOREIGN KEY (`pro_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_phase_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phases` (`phase_id`);

--
-- Constraints for table `project_subphase`
--
ALTER TABLE `project_subphase`
  ADD CONSTRAINT `project_subphase_ibfk_1` FOREIGN KEY (`pro_phase`) REFERENCES `project_phase` (`pro_phase_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `superviser_auth`
--
ALTER TABLE `superviser_auth`
  ADD CONSTRAINT `superviser_auth_ibfk_1` FOREIGN KEY (`sup_r_id`) REFERENCES `superviser` (`sup_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `super_admin_auth`
--
ALTER TABLE `super_admin_auth`
  ADD CONSTRAINT `super_admin_auth_ibfk_1` FOREIGN KEY (`su_r_id`) REFERENCES `super_admin` (`su_id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_payments`
--
ALTER TABLE `vendor_payments`
  ADD CONSTRAINT `vendor_payments_ibfk_2` FOREIGN KEY (`pay_vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vendor_payments_ibfk_3` FOREIGN KEY (`pay_project_id`) REFERENCES `projects` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vendor_payments_ibfk_4` FOREIGN KEY (`pay_exp_id`) REFERENCES `expenses` (`exp_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
