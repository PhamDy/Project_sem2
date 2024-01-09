CREATE TABLE IF NOT EXISTS `category` (
   `category_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
     `name` VARCHAR(100) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `product` (
    `product_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
     `category_id` BIGINT NOT NULL,
      `product_name` VARCHAR(100) NOT NULL,
    `avartar_image_product` VARCHAR(100) NOT NULL,
    `image1_product` VARCHAR(100) NULL,
    `image2_product` VARCHAR(100) NULL,
    `image3_product` VARCHAR(100) NULL,
    `quantity` INT NOT NULL,
    `description` TEXT NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `size` VARCHAR(50) NOT NULL,
    `brand` VARCHAR(50) NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `price` DOUBLE NOT NULL,
    `sport` VARCHAR(50) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `discount` FLOAT NULL,
    FOREIGN KEY (`category_id`) REFERENCES category(category_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);