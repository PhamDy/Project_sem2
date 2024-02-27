
-- Tạo bảng
CREATE TABLE IF NOT EXISTS `category` (
                                          `category_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                          `name` VARCHAR(100) NOT NULL UNIQUE,
    `status` ENUM('Visible', 'Invisible'),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `products` (
                                          `product_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                          `category_id` BIGINT NOT NULL,
                                          `product_name` VARCHAR(100) NOT NULL,
    `avartar_image_product` VARCHAR(100) NOT NULL,
    `image1_product` VARCHAR(100) NULL,
    `image2_product` VARCHAR(100) NULL,
    `image3_product` VARCHAR(100) NULL,
    `description` TEXT NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `brand` VARCHAR(50) NOT NULL,
    `price` DOUBLE NOT NULL,
    `status` ENUM('InStock', 'OutOfStock'),
    `discount` FLOAT NULL,
    FOREIGN KEY (`category_id`) REFERENCES category(category_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS warehouse (
                                         `warehouse_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                         `product_id` BIGINT NOT NULL,
                                         `size` VARCHAR(50) NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `quantity` INT NOT NULL,
    `status` ENUM('InStock', 'OutOfStock'),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `role` (
                                      `role_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                      `name` ENUM('ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_CUSTOMER', 'ROLE_ANONYMOUS'),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `users` (
                                       `user_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                       `username` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `avatar` VARCHAR(100) NULL,
    `otp` VARCHAR(5) NULL,
    `otp_generated_time` DATETIME,
    `enabled` TINYINT(1) DEFAULT 0,
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `user_role` (
                                           `user_id` BIGINT NOT NULL,
                                           `role_id` BIGINT NOT NULL,
                                           FOREIGN KEY (`user_id`) REFERENCES users(user_id),
    FOREIGN KEY (`role_id`) REFERENCES role(role_id),
    PRIMARY KEY(`user_id`, `role_id`)
    );

CREATE TABLE IF NOT EXISTS `reset_password` (
                                                `reset_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                                `user_id` BIGINT NOT NULL,
                                                `otp_reset` VARCHAR(10) NOT NULL,
    `reset_password_otp_expiry` DATETIME NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES users(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `address` (
                                         `address_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                         `user_id` BIGINT NULL,
                                         `first_name` VARCHAR(100)  NULL,
    `last_name` VARCHAR(100)  NULL,
    `country` VARCHAR(100)  NULL,
    `city` VARCHAR(100)  NULL,
    `address` VARCHAR(500)  NULL,
    `optional` VARCHAR(200)  NULL,
    `zipCode` VARCHAR(100)  NULL,
    `phone` VARCHAR(100)  NULL,
    FOREIGN KEY (`user_id`) REFERENCES users(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `payment` (
                                         `payment_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                         `payment_method` ENUM('ONLINE', 'CODING'),
    `status` ENUM('Success', 'Pending', 'Delivering', 'Cancel'),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `delivery` (
                                          `delivery_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                          `address_id` BIGINT NOT NULL,
                                          `delivery_status` ENUM('Success', 'Delivering', 'Cancel'),
    FOREIGN KEY (`address_id`) REFERENCES address(address_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `order` (
                                       `order_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                       `user_id` BIGINT NOT NULL,
                                       `payment_id` BIGINT NOT NULL,
                                       `delivery_id` BIGINT NOT NULL,
                                       `total_price` DOUBLE NOT NULL,
                                       `order_status` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES users(user_id),
    FOREIGN KEY (`payment_id`) REFERENCES payment(payment_id),
    FOREIGN KEY (`delivery_id`) REFERENCES delivery(delivery_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `carts` (
    `cart_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `status` ENUM('Open', 'Close') DEFAULT 'Open',
    FOREIGN KEY (`user_id`) REFERENCES users(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `cart_item` (
                                           `cart_item_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                           `product_id` BIGINT NOT NULL,
                                           `cart_id` BIGINT NOT NULL,
                                           `size` VARCHAR(50) NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INT NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES products(product_id),
    FOREIGN KEY (`cart_id`) REFERENCES carts(cart_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );

CREATE TABLE IF NOT EXISTS `product_review` (
                                                `product_review_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
                                                `product_id` BIGINT NOT NULL,
                                                `user_id` BIGINT NOT NULL,
                                                `comment` TEXT NOT NULL,
                                                `star` INT NOT NULL,
                                                `status` INT NOT NULL,
                                                FOREIGN KEY (`product_id`) REFERENCES products(product_id),
    FOREIGN KEY (`user_id`) REFERENCES users(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
    );



