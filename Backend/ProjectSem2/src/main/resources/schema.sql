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

CREATE TABLE IF NOT EXISTS `role` (
    `role_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `user` (
     `user_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
     `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(100) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `user_role` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
     FOREIGN KEY (`user_id`) REFERENCES user(user_id),
    FOREIGN KEY (`role_id`) REFERENCES role(role_id),
    PRIMARY KEY(`user_id`, `role_id`)
);

CREATE TABLE IF NOT EXISTS `reset_password` (
     `reset_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
     `user_id` BIGINT NOT NULL,
     `ResetPasswordToken` VARCHAR(200) NOT NULL,
    `ResetPasswordTokenExpiry` DATETIME NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES user(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `address` (
    `address_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
    `user_id` BIGINT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `address` VARCHAR(500) NOT NULL,
    `optional` VARCHAR(200)  NULL,
    `zipCode` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES user(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `payment` (
    `payment_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
    `payment_method` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `delivery` (
    `delivery_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
    `address_id` BIGINT NOT NULL,
    `delivery_status` VARCHAR(100) NOT NULL,
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
    FOREIGN KEY (`user_id`) REFERENCES user(user_id),
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
    FOREIGN KEY (`user_id`) REFERENCES user(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS `cart_item` (
   `cart_item_id` BIGINT AUTO_INCREMENT  PRIMARY KEY,
   `product_id` BIGINT NOT NULL,
   `cart_id` BIGINT NOT NULL,
   `sub_total` DOUBLE NOT NULL,
   `quantity` INT NOT NULL,
   FOREIGN KEY (`product_id`) REFERENCES product(product_id),
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
    FOREIGN KEY (`product_id`) REFERENCES product(product_id),
    FOREIGN KEY (`user_id`) REFERENCES user(user_id),
    `updated_at` TIMESTAMP NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(50) DEFAULT NULL
);
