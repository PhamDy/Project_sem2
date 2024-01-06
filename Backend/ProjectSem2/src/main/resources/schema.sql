CREATE TABLE IF NOT EXISTS `category` (
    `category_id` int AUTO_INCREMENT  PRIMARY KEY,
    `name` varchar(100) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` varchar(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` varchar(50) DEFAULT NULL
);