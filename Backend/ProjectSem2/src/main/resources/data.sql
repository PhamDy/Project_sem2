INSERT INTO `category` (`name`,`status`, `created_by`)
VALUES (' clothes ','Visible','Admin');

INSERT INTO `category` (`name`,`status`, `created_by`)
VALUES (' shoes ','Visible','Admin');

INSERT INTO `category` (`name`,`status`, `created_by`)
VALUES (' pants ','Visible','Admin');

UPDATE `category` SET  NAME = 'a' WHERE category_id = 1;
UPDATE `category` SET  NAME = 'b' WHERE category_id = 2;

INSERT INTO `product` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
                       `image3_product`,`quantity`,`description`,`gender`,`size`,`brand`,
                       `color`,`price`,`sport`,`status`,`discount`,`created_by`)
VALUES ('Adidas Ultra Boost 5.0', 2 ,'https://img.upanh.tv/2024/01/07/adidas1.1.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.2.jpg',
        'https://img.upanh.tv/2024/01/07/adidas1.3.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.4.jpg', 50,'High-performance running shoes with Boost technology for energy return.',
        'Men', '40', 'Adidas', 'white', 180, 'running', 'InStock', 9.5, 'admin' );

INSERT INTO `product` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
                       `image3_product`,`quantity`,`description`,`gender`,`size`,`brand`,
                       `color`,`price`,`sport`,`status`,`discount`,`created_by`)
VALUES ('Adidas NMD R1 Primeknit', 2 ,'https://img.upanh.tv/2024/01/07/adidas2.1.jpg', 'https://img.upanh.tv/2024/01/07/adidas2.2.jpg',
        'https://img.upanh.tv/2024/01/07/adidas2.3.jpg', 'https://img.upanh.tv/2024/01/07/adidas2.4.jpg', 50,'Primeknit upper for a lightweight and comfortable fit.',
        'Men', '40', 'Adidas', 'gray', 130, 'running', 'InStock', 5.5, 'admin' );


