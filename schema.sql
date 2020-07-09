DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
dep_name VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee_role (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(7) NOT NULL,
department_id INTEGER(10) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER(10) NOT NULL,
manager_id INTEGER(10),
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES employee_role (id),
FOREIGN KEY (manager_id) REFERENCES employee (id)
);