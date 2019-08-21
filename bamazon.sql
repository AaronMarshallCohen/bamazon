DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hot dog", "food", 3, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sofa", "furniture", 80, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("television", "electronics", 300, 80);
