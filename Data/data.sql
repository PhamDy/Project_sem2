INSERT INTO `category` (`name`,`status`, `created_by`)
 VALUES ('clothes', 'Visible','Admin');
 
 INSERT INTO `category` (`name`,`status`, `created_by`)
 VALUES ('shoes', 'Visible','Admin');
 
  INSERT INTO `category` (`name`,`status`, `created_by`)
 VALUES ('pants', 'Visible','Admin');
 
  UPDATE `category` SET  NAME = 'a' WHERE category_id = 1;
 UPDATE `category` SET  NAME = 'b' WHERE category_id = 2;
 
 
 INSERT INTO `product` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
 `image3_product`,`description`,`gender`,`brand`,
 `price`,`status`,`discount`,`created_by`)
 VALUES ('Adidas Ultra Boost 5.0', 2 ,'https://img.upanh.tv/2024/01/07/adidas1.1.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.2.jpg',
  'https://img.upanh.tv/2024/01/07/adidas1.3.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.4.jpg','High-performance running shoes with Boost technology for energy return.',
   'Men','Adidas', 40, 'InStock', 9.5, 'admin' );
 			
 INSERT INTO `product` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
 `image3_product`,`description`,`gender`, `brand`,
 `price`,`status`,`discount`,`created_by`)
 VALUES ('Adidas NMD R1 Primeknit', 2 ,'https://img.upanh.tv/2024/01/07/adidas2.1.jpg', 'https://img.upanh.tv/2024/01/07/adidas2.2.jpg',
  'https://img.upanh.tv/2024/01/07/adidas2.3.jpg', 'https://img.upanh.tv/2024/01/07/adidas2.4.jpg','Primeknit upper for a lightweight and comfortable fit.',
   'Women','Adidas', 70, 'InStock', 5.5, 'admin' );
   
    INSERT INTO `product` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
 `image3_product`,`description`,`gender`, `brand`,
 `price`,`status`,`discount`,`created_by`)
 VALUES ('Adidas NMD R1 Primeknit', 2 ,'https://img.upanh.tv/2024/01/07/adidas2.1.jpg', 'https://img.upanh.tv/2024/01/07/adidas2.2.jpg',
  'https://img.upanh.tv/2024/01/07/adidas2.3.jpg', 'https://img.upanh.tv/2024/01/07/adidas2.4.jpg','Primeknit upper for a lightweight and comfortable fit.',
   'Unisex','Adidas', 120, 'InStock', 5.5, 'admin' );
   
    
 INSERT INTO `product` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
 `image3_product`,`description`,`gender`,`brand`,
 `price`,`status`,`discount`,`created_by`)
 VALUES ('Adidas Ultra Boost 5.0', 2 ,'https://img.upanh.tv/2024/01/07/adidas1.1.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.2.jpg',
  'https://img.upanh.tv/2024/01/07/adidas1.3.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.4.jpg','High-performance running shoes with Boost technology for energy return.',
   'Men','Adidas', 270, 'InStock', 9.5, 'admin' );
   
       
 INSERT INTO `product` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
 `image3_product`,`description`,`gender`,`brand`,
 `price`,`status`,`discount`,`created_by`)
 VALUES ('Adidas Ultra Boost 5.0', 2 ,'https://img.upanh.tv/2024/01/07/adidas1.1.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.2.jpg',
  'https://img.upanh.tv/2024/01/07/adidas1.3.jpg', 'https://img.upanh.tv/2024/01/07/adidas1.4.jpg','High-performance running shoes with Boost technology for energy return.',
   'Men','Nike', 270, 'InStock', 9.5, 'admin' );
   
   
   
   INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`)
 VALUES (1, 'M', 'Black', 50);
 
  INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`)
 VALUES (2, 'L', 'White', 51);
 
    INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`)
 VALUES (3, 'M', 'Black', 53);
 
  INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`)
 VALUES (4, 'L', 'White', 54);
 
 INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`)
 VALUES (5, 'L', 'White', 56);
 
  INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`)
 VALUES (7, 'L', 'Multi', 57);



INSERT INTO products (product_name, category_id, avartar_image_product, image1_product,`image2_product`,
                       image3_product,`description`,`gender`, brand,
                       price,`status`,`discount`,`created_by`)
VALUES ('Adidas Ultra Boost 5.0', 1 ,'https://i.postimg.cc/6p2JCr26/adidas1-1.jpg', 'https://i.postimg.cc/VkxygJnq/adidas1-2.jpg',
        'https://i.postimg.cc/0NDTB90L/adidas1-3.jpg', 'https://i.postimg.cc/qqMWqyHT/adidas1-4.jpg','High-performance  shoes with Boost technology for energy return.',
        'Men','Adidas', 180,'InStock', 1, 'admin' ),
       ('Adidas NMD R1 Primeknit', 1 ,'https://i.postimg.cc/XJgTnxhL/adidas2-1.jpg', 'https://i.postimg.cc/44BrMLpN/adidas2-2.jpg',
        'https://i.postimg.cc/7hsd2hqT/adidas2-3.jpg', 'https://i.postimg.cc/dt3zK29R/adidas2-4.jpg','Primeknit upper for a lightweight and comfortable fit.',
        'Women','Adidas', 130,'InStock', 2, 'admin' ),
       ('Adidas Superstar Foundation', 1 ,'https://i.postimg.cc/764FvjBb/adidas3-1.jpg', 'https://i.postimg.cc/hPYN4XCk/adidas3-2.jpg',
        'https://i.postimg.cc/x1bhX9hc/adidas3-3.jpg', 'https://i.postimg.cc/CKTtDWpJ/adidas3-4.jpg','Classic shell-toe design with a durable leather upper.',
        'Unisex','Adidas', 80,'InStock', 3, 'admin' ),
       ('Adidas Yeezy Boost 350 V2', 1 ,'https://i.postimg.cc/tg3cz2Xb/adidas4-1.jpg', 'https://i.postimg.cc/yd7bpcdZ/adidas4-2.jpg',
        'https://i.postimg.cc/KzQs6jks/adidas4-3.jpg', 'https://i.postimg.cc/SRstk4cQ/adidas4-4.jpg','Kanye Wests signature style with Boost cushioning.',
        'Men','Adidas', 220, 'InStock', 4, 'admin' ),
       ('Adidas Stan Smith', 1 ,'https://i.postimg.cc/rsPZpH91/adidas5-1.jpg', 'https://i.postimg.cc/CMPQJZVR/adidas5-2.jpg',
        'https://i.postimg.cc/5NDkdZy1/adidas5-3.jpg', 'https://i.postimg.cc/Kv1sWZZJ/adidas5-4.jpg','Timeless tennis shoe with a clean and minimalist design.',
        'Unisex','Adidas', 75,'InStock', 5, 'admin' ),
       ('Adidas Originals Falcon', 1 ,'https://i.postimg.cc/pL8c2q5j/adidas6-1.jpg', 'https://i.postimg.cc/N0kNXF4f/adidas6-2.jpg',
        'https://i.postimg.cc/d0YHDrGx/adidas6-3.jpg', 'https://i.postimg.cc/636MfKjV/adidas6-4.jpg','Chunky silhouette inspired by 90s  shoes.',
        'Women','Adidas', 100,'InStock', 6, 'admin' ),
       ('Adidas EQT Support ADV', 1 ,'https://i.postimg.cc/ydfvfGtM/adidas7-1.jpg', 'https://i.postimg.cc/s2sm3yrF/adidas7-2.jpg',
        'https://i.postimg.cc/Vvd42Rcd/adidas7-3.jpg', 'https://i.postimg.cc/x8hgQz0g/adidas7-4.jpg','Modern interpretation of the Equipment series with a sock-like fit.',
        'Men','Adidas', 110, 'InStock', 7, 'admin' ),
       ('Adidas Gazelle', 1 ,'https://i.postimg.cc/MZF9VhyR/adidas8-1.jpg', 'https://i.postimg.cc/tTgzV5J2/adidas8-2.jpg',
        'https://i.postimg.cc/7YJmVmVR/adidas8-3.jpg', 'https://i.postimg.cc/x1rgFMp1/adidas8-4.jpg','Iconic suede sneaker with contrasting 3-Stripes.',
        'Unisex','Adidas', 90, 'InStock', 8, 'admin' ),
       ('Adidas Harden Vol. 4', 1 ,'https://i.postimg.cc/MpytkHgb/adidas9-1.jpg', 'https://i.postimg.cc/N0D4MVsK/adidas9-2.jpg',
        'https://i.postimg.cc/nzwGKDQZ/adidas9-3.jpg', 'https://i.postimg.cc/kG0NzPcp/adidas9-4.jpg','Signature shoe of NBA star James Harden with enhanced traction.',
        'Men','Adidas', 130,'InStock', 9, 'admin' ),
       ('Adidas Sleek Super', 1 ,'https://i.postimg.cc/0jMdVypS/adidas10-1.jpg', 'https://i.postimg.cc/KcRd67fP/adidas10-2.jpg',
        'https://i.postimg.cc/dQpzw7Nz/adidas10-3.jpg', 'https://i.postimg.cc/02ShQ8Lr/adidas10-4.jpg','Sleek and feminine design for everyday wear.',
        'Women','Adidas', 85,'InStock', 10, 'admin' );
        
        