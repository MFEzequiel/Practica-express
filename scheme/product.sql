DROP DATABASE IF EXISTS thebrother;
CREATE DATABASE thebrother;
USE thebrother;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  current_price DECIMAL(10, 2) NOT NULL,
  available_quantity_in_stock INT,
  date_added_to_catalog TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  product_image_url VARCHAR(255)
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories(
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  name VARCHAR(255) NOT NULL,
  description TEXT
);

DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  name VARCHAR(60) NOT NULL,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(25),
  password VARCHAR(255) NOT NULL,
  date_added_to_catalog TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  client_id BINARY(16),
  date_added_to_catalog TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients (id)
);

DROP TABLE IF EXISTS sale_details;
CREATE TABLE sale_details(
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  sale_id BINARY(16) NOT NULL,
  product_id BINARY(16) NOT NULL,
  quantity INT,
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS stock;
CREATE TABLE stock(
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  product_id BINARY(16) NOT NULL,
  quantity_on_hand INT NOT NULL,
  movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  transaction_type ENUM('entry', 'exit') NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS payment_management;
CREATE TABLE payment_management (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  sale_id BINARY(16),
  payment_method ENUM('cash', 'card', 'transfer', 'online') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  state ENUM('pending', 'completed', 'failed') NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (sale_id) REFERENCES sales (id) 
);

DROP TABLE IF EXISTS discounts;
CREATE TABLE discounts (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  product_id BINARY(16),
  discounts_percentage DECIMAL(5, 2),
  start_date TIMESTAMP,
  end_data TIMESTAMP, 
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS promotions;
CREATE TABLE promotions (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  promo_code VARCHAR(50) UNIQUE,
  description TEXT,
  fixed_discounts DECIMAL(10, 2),
  percentage_discount DECIMAL(5, 2),
  start_date TIMESTAMP,
  end_data TIMESTAMP
);

DROP TABLE IF EXISTS price_history;
CREATE TABLE price_history (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  product_id BINARY(16),
  price DECIMAL(10, 2),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS coments;
CREATE TABLE coments (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  client_id BINARY(16),
  product_id BINARY(16),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS admin_user;
CREATE TABLE admin_user(
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  name VARCHAR(60) NOT NULL,
  username VARCHAR(60) NOT NULL UNIQUE,
  pssword VARCHAR(255) NOT NULL,
  data_register TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO userAdmin (id, name, username, password) VALUES(1, Ezequiel, adezequiel, 1234)

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  name VARCHAR(60) NOT NULL,
  username VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'saller', 'client'),
  date_register TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS logs;
CREATE TABLE logs (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  user_id BINARY(16),
  user_action VARCHAR(255),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES clients (id)
);

DROP TABLE IF EXISTS shipments;
CREATE TABLE shipments (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  sale_id BINARY(16),
  shipment_description TEXT,
  shipment_date TIMESTAMP,
  shipment_state ENUM('pending', 'in transit', 'dilivered') NOT NULL,
  tracking_code VARCHAR(255),
  FOREIGN KEY (sale_id) REFERENCES sale (id)
);

DROP TABLE IF EXISTS return_product;
CREATE TABLE return_product (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  sale_id BINARY(16),
  product_id BINARY(16),
  quatity INT,
  return_reason TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sale_id) REFERENCES sales (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS payents;
CREATE TABLE payents (
  id BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID)),
  sale_id BINARY(16),
  method_pago ENUM('cash', 'card', 'paypal', 'mercadoPago', 'stripe') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  transaction_id VARCHAR(255),
  FOREIGN KEY (sale_id) REFERENCES sales (id)
);

DROP TABLE IF EXISTS ;
CREATE TABLE ();