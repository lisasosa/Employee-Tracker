
INSERT INTO department (dep_name)
VALUES ("Sales");
INSERT INTO department (dep_name)
VALUES ("Engineering");
INSERT INTO department (dep_name)
VALUES ("Finance");
INSERT INTO department (dep_name)
VALUES ("Legal");
SELECT * FROM department;


INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Sales Lead", 100000, 1);
INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Salesperson", 80000, 1);
INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Lead Engineer", 150000, 2);
INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Software Engineer", 120000, 2);
INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Accounting Team Lead", 160000, 3);
INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Accountant", 125000, 3);
INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Legal Team Lead", 250000, 4);
INSERT INTO employee_role
(title, salary, department_id)
VALUES
("Lawyer", 190000, 4);
SELECT * FROM employee_role;

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Danniel", "White", 2, 1);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Clark", "Moore", 3, NULL);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Tricia", "Black", 4, 3);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Felix", "Dot", 5, NULL);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Jennifer", "Post", 6 , NULL);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Samuel", "Brown", 7, 6);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Samantha", "Ernest", 8, 3);

SELECT * FROM employee;



