INSERT INTO `category` (`name`,`status`, `created_by`)
VALUES ('clothes', 'Visible','Admin'),
       ('shoes', 'Visible','Admin'),
       ('pants', 'Visible','Admin');

INSERT INTO `role` (`name`, `created_by`)
VALUES ('ROLE_ADMIN', 'Admin'),
       ('ROLE_EMPLOYEE', 'Admin'),
       ('ROLE_CUSTOMER', 'Admin'),
       ('ROLE_ANONYMOUS', 'Admin');

INSERT INTO `warehouse` (`product_id`,`size`, `color`, `quantity`, `status`, `created_by`)
VALUES (1, 'M','Black', 10, 'InStock', 'Admin'),
       (1, 'M','White', 10, 'InStock', 'Admin'),
       (1, 'L','Black', 10, 'InStock', 'Admin'),
       (1, 'L','White', 10, 'InStock', 'Admin');
