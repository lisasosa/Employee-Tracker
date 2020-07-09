const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table')


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Access all Employees",
                "Update Employee role",
                "Add employee",
                "Remove Employee",
                "Add Department",
                "update role",
                "Add role",
                "Remove role",
                "Exit",
            ]

        })
        .then(function (choice) {
            switch (choice.action) {
                case "Access all Employees":
                    accessAll();
                    break;

                case "Update Employee role":
                    updateEmployeeRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Add Department":
                    addEmpoloyee();
                    break;

                case "update role":
                    updateRole();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Remove role":
                    romoveRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function accessAll() {
    var query =
        'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('*************All Employees**************');
        console.table(res);
        runSearch();
    });
}

function updateEmployeeRole() {
    var queryRole = 'SELECT * FROM employee_role';
    var queryDepartment = 'SELECT * FROM department';

    connection.query(queryRole, function (err, res) {
        connection.query(queryDepartment, function (err, departments) {

            if (err) throw err;
            inquirer.prompt([{
                    name: "newRole",
                    type: "rawlist",

                    choices: function () {
                        var arrayofChoices = [];
                        for (var i = 0; i < res.length; i++) {
                            arrayofChoices.push(res[i].title);
                        }
                        return arrayofChoices;
                    },
                    message: "Which employee role would you like to update?"
                },
                {
                    name: "newSalary",
                    input: "input",
                    message: "What salary would you like to enter?"
                },
                {
                    name: 'choice',
                    type: "rawlist",
                    choices: function () {
                        var arrayofChoices = [];
                        for (var i = 0; i < departments.length; i++) {
                            arrayofChoices.push(departments[i].dep_name);
                        }
                        return arrayofChoices;
                    },
                    message: "Enter the name of the department for this role"
                },
            ]).then(function (result) {
                for (var i = 0; i < departments.length; i++) {
                    if (departments[i].name === result.choice) {
                        result.department_id = departments[i].id;
                    }
                }
                var query = "UPDATE employee_role SET title=?, salary = ? WHERE department_id = ?"
                const VALUES = [{
                        title: result.newRole
                    },
                    {
                        salary: result.newSalary
                    },
                    {
                        department_id: result.department_id
                    }
                ]
                let query1 = connection.query(query, VALUES, function (err) {
                    if (err) throw err;
                    console.table('Role has successfully been updated');
                    runSearch()
                });
            })
        })
    })
}