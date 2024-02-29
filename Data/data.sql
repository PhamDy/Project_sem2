INSERT INTO `category` (`name`,`status`, `created_by`)
 VALUES ('clothes', 'Visible','Admin'),
  ('shoes', 'Visible','Admin'),
   ('pants', 'Visible','Admin');
  
INSERT INTO `role` (`name`, `created_by`)
 VALUES ('ROLE_ADMIN', 'Admin'),
  ('ROLE_EMPLOYEE', 'Admin'),
  ('ROLE_CUSTOMER', 'Admin'),
  ('ROLE_ANONYMOUS', 'Admin');
  
  INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`,`image2_product`,
                        `image3_product`,`description`,`gender`, `brand`,
                        `price`,`status`,`discount`,`created_by`)
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

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES ('Puma Future Rider', 1, 'https://i.postimg.cc/PfQ2FCsW/puma1-1.jpg', 'https://i.postimg.cc/FKSxbRVJ/puma1-2.jpg', 'https://i.postimg.cc/kgBs4wVs/puma1-3.jpg', 'https://i.postimg.cc/zB1Fxrx2/puma1-4.jpg', 'Retro-inspired sneaker with a futuristic twist.', 'Unisex', 'Puma', 80, 'InStock', 0, 'admin'),
       ('Puma Cali', 1, 'https://i.postimg.cc/WbpXRsTQ/puma2-1.jpg', 'https://i.postimg.cc/4xq5htVg/puma2-2.jpg', 'https://i.postimg.cc/wTWFgnB3/puma2-3.jpg', 'https://i.postimg.cc/C1HHtQth/puma2-4.jpg', 'Classic California-style sneaker with a chunky sole.', 'Unisex', 'Puma', 70, 'InStock', 0, 'admin'),
       ('Puma RS-X³ Puzzle', 1, 'https://i.postimg.cc/xj533BMg/puma3-1.jpg', 'https://i.postimg.cc/8PndqWy6/puma3-2.jpg', 'https://i.postimg.cc/zvzS1kZn/puma3-3.jpg', 'https://i.postimg.cc/zvxwDR84/puma4-1.jpg', 'Bold and chunky silhouette with a puzzle-inspired design.', 'Unisex', 'Puma', 110, 'InStock', 0, 'admin'),
       ('Puma Clyde Hardwood', 1, 'https://i.postimg.cc/HsL4Z3tm/puma4-2.jpg', 'https://i.postimg.cc/k5Wx6H7Q/puma4-3.jpg', 'https://i.postimg.cc/2Sbdm6JX/puma4-4.jpg', '', 'Classic basketball sneaker with a timeless design.', 'Unisex', 'Puma', 120, 'InStock', 0, 'admin'),
       ('Puma Cell Venom', 1, 'https://i.postimg.cc/cLpRJWG1/puma5-1.jpg', 'https://i.postimg.cc/vBM5Wvmp/puma5-2.jpg', 'https://i.postimg.cc/4d5Vwh7n/puma5-3.jpg', 'https://i.postimg.cc/NFjTnfmD/puma5-4.jpg', 'Vintage-inspired sneaker with chunky cushioning.', 'Unisex', 'Puma', 100, 'InStock', 0, 'admin'),
       ('Puma Suede Classic', 1, 'https://i.postimg.cc/PJVZnsMj/puma6-1.jpg', 'https://i.postimg.cc/RCgwHKxD/puma6-2.jpg', 'https://i.postimg.cc/sD179xVD/puma6-3.jpg', 'https://i.postimg.cc/WbKr9V3m/puma6-4.jpg', 'Iconic suede sneaker with a comfortable fit.', 'Unisex', 'Puma', 65, 'InStock', 0, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES ('Converse Chuck Taylor All Star Low', 1, 'https://i.postimg.cc/D0kdYK5Y/converse1-1.jpg', 'https://i.postimg.cc/prfQw16V/converse1-2.jpg', 'https://i.postimg.cc/c1wctrLq/converse1-3.jpg', 'https://i.postimg.cc/pXBYk4jq/converse1-4.jpg', 'Timeless canvas sneaker with a low-top silhouette.', 'Unisex', 'Converse', 55, 'InStock', 0, 'admin'),
       ('Converse Chuck 70 High Top', 1, 'https://i.postimg.cc/N0Z15chf/converse2-1.jpg', 'https://i.postimg.cc/VLwWqmJJ/converse2-2.jpg', 'https://i.postimg.cc/DwyQN6dF/converse2-3.jpg', 'https://i.postimg.cc/xdXvfd44/converse2-4.jpg', 'Classic high-top sneaker with upgraded features.', 'Unisex', 'Converse', 80, 'InStock', 0, 'admin'),
       ('Converse Jack Purcell Low Top', 1, 'https://i.postimg.cc/dVHRcC4C/converse3-1.jpg', 'https://i.postimg.cc/FRc0SBmb/converse3-2.jpg', 'https://i.postimg.cc/3NTmFFJs/converse3-3.jpg', 'https://i.postimg.cc/C5sDPnRz/converse3-4.jpg', 'Signature low-top sneaker with Jack Purcell smile on the toe.', 'Unisex', 'Converse', 65, 'InStock', 0, 'admin'),
       ('Converse Run Star Hike', 1, 'https://i.postimg.cc/DfrqyHxn/converse4-1.jpg', 'https://i.postimg.cc/TYTny0sm/converse4-2.jpg', 'https://i.postimg.cc/hPMTVxFY/converse4-3.jpg', 'https://i.postimg.cc/Sxs8dskx/converse4-4.jpg', 'Elevated platform sole for a bold, modern look.', 'Unisex', 'Converse', 110, 'InStock', 0, 'admin'),
       ('Converse Chuck Taylor All Star Lift', 1, 'https://i.postimg.cc/T34b463q/converse5-1.jpg', 'https://i.postimg.cc/W4qZRHDR/converse5-2.jpg', 'https://i.postimg.cc/MTkQzmRn/converse5-3.jpg', 'https://i.postimg.cc/85hrcfBt/converse5-4.jpg', 'Classic sneaker with a platform sole for added height.', 'Unisex', 'Converse', 65, 'InStock', 0, 'admin'),
       ('Converse One Star Pro', 1, 'https://i.postimg.cc/nVGDt7LL/converse6-1.jpg', 'https://i.postimg.cc/qq463B10/converse6-2.jpg', 'https://i.postimg.cc/nr2jY8Wm/converse6-3.jpg', 'https://i.postimg.cc/c4181HKB/converse6-4.jpg', 'Durable skate shoe with a comfortable Lunarlon insole.', 'Unisex', 'Converse', 70, 'InStock', 0, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES ('Vans Old Skool', 1, 'https://i.postimg.cc/zfwgXRkp/v1-1.jpg', 'https://i.postimg.cc/JhCXLQjG/v1-2.jpg', 'https://i.postimg.cc/3Rn025Vv/v1-3.jpg', 'https://i.postimg.cc/jdWnn1XD/v1-4.jpg', 'Classic skate shoe with side stripe detailing.', 'Unisex', 'Vans', 60, 'InStock', 0, 'admin'),
       ('Vans Authentic', 1, 'https://i.postimg.cc/cCzK57s1/v2-1.jpg', 'https://i.postimg.cc/ZRTy9K7m/v2-2.jpg', 'https://i.postimg.cc/y6pSdKFq/v2-3.jpg', 'https://i.postimg.cc/T11L9NvH/v2-4.jpg', 'Original and iconic Vans style with a low-top silhouette.', 'Unisex', 'Vans', 50, 'InStock', 0, 'admin'),
       ('Vans Sk8-Hi', 1, 'https://i.postimg.cc/sg7BwZby/v3-1.jpg', 'https://i.postimg.cc/ZK1B8L7V/v3-2.jpg', 'https://i.postimg.cc/q7GNdHk5/v3-3.jpg', 'https://i.postimg.cc/N0tKVjwX/v3-4.jpg', 'High-top skate shoe with padded collars for support.', 'Unisex', 'Vans', 70, 'InStock', 0, 'admin'),
       ('Vans Slip-On', 1, 'https://i.postimg.cc/nzRMCK9K/v4-1.jpg', 'https://i.postimg.cc/nzcCFSrc/v4-2.jpg', 'https://i.postimg.cc/fyVyX3YG/v4-3.jpg', 'https://i.postimg.cc/1XbtK9Hf/v4-4.jpg', 'Easy-to-wear slip-on sneaker with a classic look.', 'Unisex', 'Vans', 55, 'InStock', 0, 'admin'),
       ('Vans Era', 1, 'https://i.postimg.cc/ryHKTJkM/v5-1.jpg', 'https://i.postimg.cc/3JDWxv8p/v5-2.jpg', 'https://i.postimg.cc/bwcrDwr5/v5-3.jpg', '', 'Low-top skate shoe with a padded collar for comfort.', 'Unisex', 'Vans', 55, 'InStock', 0, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES
('Nike Air Max 270', 2, 'https://i.postimg.cc/x1nYVJc9/nike1-1.jpg', 'https://i.postimg.cc/bwgPyytk/nike1-2.jpg', 'https://i.postimg.cc/g0BPhg40/nike1-3.jpg', 'https://i.postimg.cc/MKkqtrwM/nike1-4.jpg', 'Iconic Air Max shoe with a large Air unit for cushioning.', 'Unisex', 'Nike', 150, 'InStock', 10, 'admin'),
('Nike Air Force 1', 2, 'https://i.postimg.cc/sXQC4504/Nike2-1.jpg', 'https://i.postimg.cc/50hd7jhd/Nike2-2.jpg', 'https://i.postimg.cc/4NzZ0b48/Nike2-3.jpg', 'https://i.postimg.cc/HLLgjqwK/Nike2-4.jpg', 'Classic and iconic basketball-inspired sneaker.', 'Women', 'Nike', 90, 'InStock', 20, 'admin'),
('Nike Jordan 1 Low Panda DC0774-101', 2, 'https://i.postimg.cc/0j7gLPv6/nike3-1.jpg', 'https://i.postimg.cc/7YyrSG1S/nike3-2.jpg', 'https://i.postimg.cc/RCtz3QtM/nike3-3.jpg', 'https://i.postimg.cc/DwvVY9MZ/nike3-4.jpg', 'Modern and stylish lifestyle shoe with React cushioning.', 'Men', 'Nike', 160, 'InStock', 30, 'admin'),
('Nike Air Jordan 1 High OG UNC University Blue', 2, 'https://i.postimg.cc/ZKFtHbj2/nike4-1.jpg', 'https://i.postimg.cc/wjwKKwCk/nike4-2.jpg', 'https://i.postimg.cc/SKRBmWqb/nike4-3.jpg', 'https://i.postimg.cc/7LRphfYG/nike4-4.jpg', 'Versatile running shoe with responsive cushioning.', 'Men', 'Nike', 120, 'InStock', 40, 'admin'),
('Nike Joyride Run Flyknit', 2, 'https://i.postimg.cc/rmt7rMKh/nike5-1.jpg', 'https://i.postimg.cc/0jY3VnGD/nike5-2.jpg', 'https://i.postimg.cc/SRF3L39m/nike5-3.jpg', 'https://i.postimg.cc/nVB6VV8r/nike5-4.jpg', 'Innovative running shoe with tiny beads for customized cushioning.', 'Women', 'Nike', 180, 'InStock', 50, 'admin'),
('Nike Blazer Mid ''77 Vintage', 2, 'https://i.postimg.cc/J48Sswmq/nike6-1.jpg', 'https://i.postimg.cc/ZKL23f5h/nike6-2.jpg', 'https://i.postimg.cc/DwyDcqS4/nike6-3.jpg', 'https://i.postimg.cc/Jz6FYGX6/nike6-4.jpg', 'Vintage-inspired basketball shoe with a retro design.', 'Unisex', 'Nike', 100, 'InStock', 60, 'admin'),
('Nike Air Zoom Terra Kiger 7', 2, 'https://i.postimg.cc/fbVrGDjw/nike7-1.jpg', 'https://i.postimg.cc/rskZRW6m/nike7-2.jpg', 'https://i.postimg.cc/MGgFxNd1/nike7-3.jpg', 'https://i.postimg.cc/9MTNfbnK/nike7-4.jpg', 'Trail running shoe with responsive cushioning and traction.', 'Men', 'Nike', 140, 'InStock', 70, 'admin'),
('Nike Free RN 5.0', 2, 'https://i.postimg.cc/MHmP7TxY/nike8-1.jpg', 'https://i.postimg.cc/9Xdn5xTq/nike8-2.jpg', 'https://i.postimg.cc/3J3bKgCf/nike8-3.jpg', 'https://i.postimg.cc/02ZXrbVk/nike9-1.jpg', 'Lightweight and flexible running shoe for natural movement.', 'Women', 'Nike', 100, 'InStock', 80, 'admin'),
('Nike SB Dunk Low', 2, 'https://i.postimg.cc/P5x3DT7m/nike9-2.jpg', 'https://i.postimg.cc/Jz2TcSwS/nike9-3.jpg', 'https://i.postimg.cc/vmx0PXbT/nike9-4.jpg', 'https://i.postimg.cc/j5VZBNSX/nike10-1.jpg', 'Iconic skateboarding shoe with various colorways and collaborations.', 'Men', 'Nike', 110, 'InStock', 90, 'admin'),
('Nike Air Max 97', 2, 'https://i.postimg.cc/FRjDvRfQ/nike10-2.jpg', 'https://i.postimg.cc/x8ng12HN/nike10-3.jpg', 'https://i.postimg.cc/NFDDyz7J/nike10-4.jpg', 'https://i.postimg.cc/x1nYVJc9/nike1-1.jpg', 'Futuristic design with full-length Max Air cushioning.', 'Women', 'Nike', 170, 'InStock', 100, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES
('Adidas Originals Tracksuit', 2, 'https://i.postimg.cc/5ysGc0G2/ad1-1.jpg', 'https://i.postimg.cc/QxnP0F16/ad1-2.jpg', 'https://i.postimg.cc/x8f7FH6Z/ad1-3.jpg', 'https://i.postimg.cc/HWzF8Zx1/ad1-4.jpg', 'Classic Adidas tracksuit with the iconic three stripes.', 'Unisex', 'Adidas', 80, 'InStock', 10, 'admin'),
('Adidas Croptop Long Sleeve', 2, 'https://i.postimg.cc/GhpVFF88/ad2-1.jpg', 'https://i.postimg.cc/nhyWfNdB/ad2-2.jpg', 'https://i.postimg.cc/zGbQMqkq/ad2-3.jpg', 'https://i.postimg.cc/VNXVf4TT/ad2-4.jpg', 'Trendy long sleeve croptop for a stylish look.', 'Women', 'Adidas', 30, 'InStock', 20, 'admin'),
('Adidas Sportswear Set', 2, 'https://i.postimg.cc/fyqH2Pt3/ad3-1.jpg', 'https://i.postimg.cc/T137cxwM/ad3-2.jpg', 'https://i.postimg.cc/W3nYrzsw/ad3-3.jpg', 'https://i.postimg.cc/ZRZDCpzq/ad3-4.jpg', 'Coordinated sportswear set with a comfortable fit.', 'Unisex', 'Adidas', 70, 'InStock', 30, 'admin'),
('Adidas Cuffed Sweatpants', 2, 'https://i.postimg.cc/wxwbj1f6/adidas4-1.jpg', 'https://i.postimg.cc/WbtYFsC0/adidas4-2.jpg', 'https://i.postimg.cc/RZHPdXMF/adidas4-3.jpg', 'https://i.postimg.cc/qMYb29HS/adidas4-4.jpg', 'Cozy sweatpants with cuffed ankles for a relaxed fit.', 'Men', 'Adidas', 35, 'InStock', 40, 'admin'),
('Adidas Aeroready Designed', 2, 'https://i.postimg.cc/VN9KQv0P/adidas5-1.jpg', 'https://i.postimg.cc/LsFxbLXV/adidas5-2.jpg', 'https://i.postimg.cc/50xnxJ8Y/adidas5-3.jpg', 'https://i.postimg.cc/Px2KJ7M6/adidas5-4.jpg', 'Training set for versatile workout sessions.', 'Women', 'Adidas', 75, 'InStock', 50, 'admin'),
('Adidas Training Ensemble', 2, 'https://i.postimg.cc/KjjfM5qm/adidas6-1.jpg', 'https://i.postimg.cc/h4ZpqHvv/adidas6-2.jpg', 'https://i.postimg.cc/ZnQcFy2p/adidas6-3.jpg', 'https://i.postimg.cc/kXVwMfRc/adidas6-4.jpg', 'Training set for versatile workout sessions.', 'Men', 'Adidas', 75, 'InStock', 60, 'admin'),
('Adidas Street Style Set', 2, 'https://i.postimg.cc/NfWDKm1w/adidas7-1.jpg', 'https://i.postimg.cc/qvyLyqL6/adidas7-2.jpg', 'https://i.postimg.cc/0NC0X4h8/adidas7-3.jpg', 'https://i.postimg.cc/LsSVTSCC/adidas7-4.jpg', 'Stylish streetwear set for a trendy look.', 'Women', 'Adidas', 85, 'InStock', 70, 'admin'),
('Adidas HE7430 & HE7419', 2, 'https://i.postimg.cc/TwYqz9Xn/adidas8-1.jpg', 'https://i.postimg.cc/Px3zTwt9/adidas8-2.jpg', 'https://i.postimg.cc/90DPMQ0M/adidas8-3.jpg', 'https://i.postimg.cc/7hj3TrJN/adidas8-4.jpg', 'Stylish streetwear set for a trendy look.', 'Men', 'Adidas', 85, 'InStock', 80, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES
('Nike Pro Compression Leggings', 2, 'https://i.postimg.cc/pTwQmtFJ/nike1-1.jpg', 'https://i.postimg.cc/02dGyF27/nike1-2.jpg', 'https://i.postimg.cc/cCfRY57y/nike1-3.jpg', 'https://i.postimg.cc/fR8xxddL/nike1-4.jpg', 'Compression leggings for maximum support and comfort during workouts.', 'Unisex', 'Nike', 50, 'InStock', 20, 'admin'),
('Nike Tech Fleece Joggers', 2, 'https://i.postimg.cc/L4PBrhcC/nike2-1.jpg', 'https://i.postimg.cc/3JHC7Y7K/nike2-2.jpg', 'https://i.postimg.cc/tg7FDgdz/nike2-3.jpg', 'https://i.postimg.cc/kgJQ6sBz/nike2-4.jpg', 'Tech Fleece joggers for a modern and stylish athletic look.', 'Men', 'Nike', 65, 'InStock', 15, 'admin'),
('Nike Dri-FIT Training Shorts', 2, 'https://i.postimg.cc/jdKNmcQ2/nike3-1.jpg', 'https://i.postimg.cc/KctB0wTC/nike3-2.jpg', 'https://i.postimg.cc/Y0NFjLkt/nike3-3.jpg', 'https://i.postimg.cc/FKq36QDX/nike3-4.jpg', 'Moisture-wicking Dri-FIT shorts for cool and comfortable workouts.', 'Men', 'Nike', 40, 'InStock', 25, 'admin'),
('Nike Graphic Print T-Shirt', 2, 'https://i.postimg.cc/QtT1Gny9/nike4-1.jpg', 'https://i.postimg.cc/hvRxSbkC/nike4-2.jpg', 'https://i.postimg.cc/xTRH2mtR/nike4-3.jpg', 'https://i.postimg.cc/4xxcN30T/nike4-4.jpg', 'Casual t-shirt with a bold Nike graphic print.', 'Women', 'Nike', 30, 'InStock', 25, 'admin'),
('Nike Pro Dri-FIT Training Top', 2, 'https://i.postimg.cc/nhSDsJ89/nike5-1.jpg', 'https://i.postimg.cc/yNJScbBQ/nike5-2.jpg', 'https://i.postimg.cc/bY0Sxbch/nike5-3.jpg', 'https://i.postimg.cc/bNzD3Jp2/nike6-1.jpg', 'Dri-FIT training top for optimal moisture management during intense workouts.', 'Women', 'Nike', 35, 'InStock', 20, 'admin'),
('Nike Tech Knit Crewneck Sweatshirt', 2, 'https://i.postimg.cc/gJ8XBLx3/nike6-2.jpg', 'https://i.postimg.cc/tgLn5N4X/nike6-3.jpg', 'https://i.postimg.cc/qqGtpfXR/nike7-1.jpg', 'https://i.postimg.cc/MHwMkZBN/nike7-2.jpg', 'Comfortable and stylish Tech Knit crewneck sweatshirt for a sporty look.', 'Men', 'Nike', 50, 'InStock', 18, 'admin'),
('Nike Pro HyperWarm Hoodie', 2, 'https://i.postimg.cc/hPpJwBtZ/nike8-1.jpg', 'https://i.postimg.cc/SxRXbvXS/nike8-2.jpg', 'https://i.postimg.cc/kgH2Jv8x/nike8-3.jpg', 'https://i.postimg.cc/3R5WprtN/nike8-4.jpg', 'HyperWarm hoodie for ultimate warmth during cold weather workouts.', 'Women', 'Nike', 70, 'InStock', 15, 'admin'),
('Nike Sportswear Tech Fleece Pants', 2, 'https://i.postimg.cc/bv2ssSH4/nike9-1.jpg', 'https://i.postimg.cc/mDYkSxnw/nike9-2.jpg', 'https://i.postimg.cc/kGw5kQqR/nike9-3.jpg', 'https://i.postimg.cc/0j9QWWRq/nike9-4.jpg', 'Tech Fleece pants with a modern silhouette for a casual, sporty style.', 'Men', 'Nike', 60, 'InStock', 18, 'admin'),
('Nike Yoga Pants', 2, 'https://i.postimg.cc/65j3cfMD/nike10-1.jpg', 'https://i.postimg.cc/dtt3Gxj2/nike10-2.jpg', 'https://i.postimg.cc/T3KP45Sh/nike10-3.jpg', 'https://i.postimg.cc/Gm6pwhwK/nike10-4.jpg', 'Comfortable and stretchy yoga pants for versatile workouts.', 'Women', 'Nike', 45, 'InStock', 20, 'admin'),
('Nike Therma-FIT Joggers', 2, 'https://i.postimg.cc/5ysGc0G2/ad1-1.jpg', 'https://i.postimg.cc/QxnP0F16/ad1-2.jpg', 'https://i.postimg.cc/x8f7FH6Z/ad1-3.jpg', 'https://i.postimg.cc/HWzF8Zx1/ad1-4.jpg', 'Warm and cozy Therma-FIT joggers for colder weather.', 'Men', 'Nike', 55, 'InStock', 15, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES
('Puma Active Training Shorts', 2, 'https://i.postimg.cc/Nf5Ysqxz/pm1-1.jpg', 'https://i.postimg.cc/nVdpfcqm/pm1-2.jpg', 'https://i.postimg.cc/VvH8qDzg/pm1-3.jpg', NULL, 'Active training shorts designed for maximum comfort during workouts.', 'Men', 'Puma', 30, 'InStock', 10, 'admin'),
('Puma Graphic Print Hooded Sweatshirt', 2, 'https://i.postimg.cc/QxwDV44x/pm2-1.jpg', 'https://i.postimg.cc/g0qbSYYn/pm2-2.jpg', NULL, NULL, 'Stylish hooded sweatshirt with a bold Puma graphic print.', 'Men', 'Puma', 55, 'InStock', 20, 'admin'),
('Puma Casual Drawstring Shorts', 2, 'https://i.postimg.cc/Z5NSN82P/pm3-1.jpg', 'https://i.postimg.cc/bvjj9Gf7/pm3-2.jpg', 'https://i.postimg.cc/Y9rKTJ98/pm3-3.jpg', NULL, 'Casual drawstring shorts for a laid-back and trendy style.', 'Men', 'Puma', 25, 'InStock', 30, 'admin'),
('Puma Street Style Set', 2, 'https://i.postimg.cc/QCVLd1cT/pm4-1.jpg', 'https://i.postimg.cc/sXTdzwGz/pm4-2.jpg', 'https://i.postimg.cc/9FR53Pm3/pm4-3.jpg', 'https://i.postimg.cc/7PQ8QtyM/pm4-4.jpg', 'Coordinated streetwear set featuring a logo t-shirt and matching shorts.', 'Men', 'Puma', 50, 'InStock', 40, 'admin'),
('Puma Essential Long Sleeve Tee', 2, 'https://i.postimg.cc/8P28TFc7/pm5-1.jpg', 'https://i.postimg.cc/vTKJgTvS/pm5-2.jpg', NULL, NULL, 'Essential long sleeve tee for a comfortable and casual look.', 'Men', 'Puma', 35, 'InStock', 50, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES
('Adidas Originals Trefoil Cap', 3, 'https://i.postimg.cc/yYz5GMbR/ads1-1.jpg', 'https://i.postimg.cc/d0DSdwLb/ads1-2.jpg', 'https://i.postimg.cc/wjqrqhHT/ads1-3.jpg', 'https://i.postimg.cc/QxkPZf2y/ads1-4.jpg', 'Classic cap with the iconic Adidas Trefoil logo.', 'Unisex', 'Adidas', 25, 'InStock', 10, 'admin'),
('Adidas Superlite Prime Cap', 3, 'https://i.postimg.cc/tTxSSkdD/ads2-1.jpg', 'https://i.postimg.cc/MG43mNBv/ads2-2.jpg', 'https://i.postimg.cc/g2gTnnky/ads2-3.jpg', 'https://i.postimg.cc/Kjh9dTJb/ads2-4.jpg', 'Lightweight and breathable cap for sports and workouts.', 'Unisex', 'Adidas', 20, 'InStock', 20, 'admin'),
('Adidas Tango Graphic Cap', 3, 'https://i.postimg.cc/2ydHm5KZ/ads3-1.jpg', 'https://i.postimg.cc/G3vgvMmm/ads3-2.jpg', 'https://i.postimg.cc/7YVBWf7v/ads3-3.jpg', 'https://i.postimg.cc/7ZZB8wM5/ads3-4.jpg', 'Soccer-inspired cap with a stylish graphic design.', 'Unisex', 'Adidas', 30, 'InStock', 30, 'admin'),
('Adidas EQT Logo Snapback', 3, 'https://i.postimg.cc/m2RXjQPN/ads4-1.jpg', 'https://i.postimg.cc/fRq8MpBB/ads4-2.jpg', 'https://i.postimg.cc/wBt0M2rH/ads4-3.jpg', 'https://i.postimg.cc/fb659X4d/ads4-4.jpg', 'Snapback cap with the EQT logo for a street-style look.', 'Unisex', 'Adidas', 35, 'InStock', 40, 'admin'),
('Adidas Running Hat', 3, 'https://i.postimg.cc/LXLDBXRb/ads5-1.jpg', 'https://i.postimg.cc/1XSHWQ35/ads5-2.jpg', 'https://i.postimg.cc/9XP1DrL4/ads5-3.jpg', 'https://i.postimg.cc/sxJJqNMP/ads5-4.jpg', 'Breathable running hat for outdoor workouts.', 'Unisex', 'Adidas', 28, 'InStock', 50, 'admin'),
('Adidas Originals Bucket Hat', 3, 'https://i.postimg.cc/KvZfBxW0/ads6-1.jpg', 'https://i.postimg.cc/MKdDYg2q/ads6-2.jpg', 'https://i.postimg.cc/VkvFZ4mM/ads6-3.jpg', 'https://i.postimg.cc/g27HCR27/ads6-4.jpg', 'Trendy bucket hat with the Adidas Originals logo.', 'Unisex', 'Adidas', 30, 'InStock', 60, 'admin'),
('Adidas A-Stretch Cap', 3, 'https://i.postimg.cc/0NJ0PQ6y/ads7-1.jpg', 'https://i.postimg.cc/JnVcnLJc/ads7-2.jpg', 'https://i.postimg.cc/cHR7tbBq/ads7-3.jpg', NULL, 'Flexible and comfortable cap for golf enthusiasts.', 'Unisex', 'Adidas', 40, 'InStock', 70, 'admin'),
('Adidas NMD Five-Panel Hat', 3, 'https://i.postimg.cc/4yX66QWY/ads8-1.jpg', 'https://i.postimg.cc/x8gKtNZt/ads8-2.jpg', 'https://i.postimg.cc/SNNLjVX5/ads8-3.jpg', 'https://i.postimg.cc/bYRHz4vk/ads8-4.jpg', 'Five-panel hat with NMD branding for a modern look.', 'Unisex', 'Adidas', 32, 'InStock', 80, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES
('Nike AeroBill Featherlight Cap', 3, 'https://i.postimg.cc/Vk2XG87Q/nike1-1.jpg', 'https://i.postimg.cc/mkZ9z2rM/nike1-2.jpg', NULL, NULL, 'Lightweight and breathable running cap with AeroBill technology.', 'Unisex', 'Nike', 28, 'InStock', 10, 'admin'),
('Nike SB Performance Trucker Hat', 3, 'https://i.postimg.cc/bvbk4BMG/nike2-1.jpg', 'https://i.postimg.cc/vBsfyvF0/nike2-2.jpg', NULL, NULL, 'Trucker-style hat designed for skateboarding performance.', 'Unisex', 'Nike', 32, 'InStock', 20, 'admin'),
('Nike Sportswear Futura Cap', 3, 'https://i.postimg.cc/kGjbx3VH/nike3-1.jpg', 'https://i.postimg.cc/4dQtxhXs/nike3-2.jpg', 'https://i.postimg.cc/2jThpvHx/nike3-3.jpg', NULL, 'Classic cap with the Nike Futura logo for a sporty look.', 'Unisex', 'Nike', 25, 'InStock', 30, 'admin'),
('Nike Golf Legacy91 Tech Cap', 3, 'https://i.postimg.cc/c4HYdH2G/nike4-1.jpg', 'https://i.postimg.cc/nh9DQWnd/nike4-2.jpg', NULL, NULL, 'Golf cap with Dri-FIT technology for moisture-wicking.', 'Unisex', 'Nike', 35, 'InStock', 40, 'admin'),
('Nike NSW Heritage86 Cap', 3, 'https://i.postimg.cc/N0hr8xMQ/nike5-1.jpg', 'https://i.postimg.cc/sDNWxzCQ/nike5-2.jpg', NULL, NULL, 'Heritage-style cap with an adjustable strap for a custom fit.', 'Unisex', 'Nike', 20, 'InStock', 50, 'admin');

INSERT INTO `products` (`product_name`, category_id, `avartar_image_product`, `image1_product`, `image2_product`, `image3_product`, `description`, `gender`, `brand`, `price`, `status`, `discount`, `created_by`)
VALUES
('Puma Archive Baseball Cap', 3, 'https://i.postimg.cc/7PCGRc2q/pm1-1.jpg', 'https://i.postimg.cc/GhGBLyKN/pm1-2.jpg', 'https://i.postimg.cc/HktV51f9/pm1-3.jpg', 'https://i.postimg.cc/MGPHPbZc/pm1-4.jpg', 'Classic baseball cap with the Puma Archive logo.', 'Unisex', 'Puma', 20, 'InStock', 10, 'admin'),
('Puma Running Visor', 3, 'https://i.postimg.cc/Xv7XkDWS/pm2-1.jpg', 'https://i.postimg.cc/nV6jfk4B/pm2-2.jpg', 'https://i.postimg.cc/wv1vSy3w/pm2-3.jpg', 'https://i.postimg.cc/RZmWNZb0/pm2-4.jpg', 'Visor-style cap for running with moisture-wicking material.', 'Unisex', 'Puma', 18, 'InStock', 20, 'admin'),
('Puma Ess Cap', 3, 'https://i.postimg.cc/MHRGpC7R/pm3-1.jpg', 'https://i.postimg.cc/mZFkjHvD/pm3-2.jpg', 'https://i.postimg.cc/m2YDfG2W/pm3-3.jpg', 'https://i.postimg.cc/Lsb4B9vL/pm3-4.jpg', 'Essential cap with the Puma logo for everyday wear.', 'Unisex', 'Puma', 15, 'InStock', 30, 'admin'),
('Puma Evercat Alloy Stretch Fit Cap', 3, 'https://i.postimg.cc/kX34p5Cy/pm4-1.jpg', 'https://i.postimg.cc/Dw5w0dXC/pm4-2.jpg', 'https://i.postimg.cc/cLdJd5rg/pm4-3.jpg', 'https://i.postimg.cc/W43bkFms/pm4-4.jpg', 'Stretch-fit cap with moisture-wicking technology.', 'Unisex', 'Puma', 22, 'InStock', 40, 'admin'),
('Puma X Big Sean Knit Hat', 3, 'https://i.postimg.cc/HnGpR6qL/pm5-1.jpg', 'https://i.postimg.cc/RhcMBcmL/pm5-2.jpg', 'https://i.postimg.cc/wvRqwCbP/pm5-3.jpg', 'https://i.postimg.cc/xjHjMSmN/pm5-4.jpg', 'Knit hat with the Puma X Big Sean collaboration branding.', 'Unisex', 'Puma', 30, 'InStock', 50, 'admin'),
('Puma x Hello Kitty Bucket Hat', 3, 'https://i.postimg.cc/4Ngf1FvL/pm6-1.jpg', 'https://i.postimg.cc/dVQJbkxG/pm6-2.jpg', 'https://i.postimg.cc/m2ybpN8b/pm6-3.jpg', NULL, 'Bucket hat featuring the iconic Puma and Hello Kitty collaboration.', 'Unisex', 'Puma', 35, 'InStock', 60, 'admin');

INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`, `status`, `created_by`)
 VALUES (1, 'M','Black', 10, 'InStock', 'Admin'),
 			(1, 'M','White', 10, 'InStock', 'Admin'),
 			(1, 'L','Black', 10, 'InStock', 'Admin'),
 			(1, 'L','White', 10, 'InStock', 'Admin');

