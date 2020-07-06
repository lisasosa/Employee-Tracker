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
                "Update Employee",
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

                case "Update Employee":
                    updateEmployee();
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