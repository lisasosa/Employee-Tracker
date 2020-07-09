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
                "view employees",
                "view department",
                "View Roles",
                "Update Employee role",
                "Add employee",
                "Add Department",
                "update role",
                "Add role",
                "Exit",
            ]

        })
        .then(function (choice) {
            switch (choice.action) {
                case "view employees":
                    viewEmployees();
                    break;

                case "view department":
                    viewDepartment();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "Update Employee role":
                    updateEmployeeRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;


                case "Add Department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;


                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewEmployees() {
    var query =
        'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('*************All Employees**************');
        console.table(res);
        runSearch();
    });
}

function viewDepartment() {
    var query =
        'SELECT dep_name AS Departments FROM department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('*************All Departments**************');
        console.table(res);
        runSearch();
    });
}

function viewRoles() {
    var query =
        'SELECT title AS Roles FROM employee_role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('*************All Roles**************');
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

function addEmployee() {
    connection.query('SELECT * FROM employee_role', function (err, results) {
        if (err) throw err;

        inquirer.prompt([{
                type: 'input',
                name: 'firstname',
                message: "Enter employee's first name"
            },
            {
                type: 'input',
                name: 'lastname',
                message: "Enter employee's last name"
            },
            {
                name: 'choice',
                type: 'rawlist',
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    return choiceArray;
                },
                message: "Enter employee's role"
            },
            {
                type: 'input',
                name: 'empmanager',
                message: "Enter employee's manager"
            }
        ]).then(function (res) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].title === res.choice) {
                    res.role_id = results[i].id;
                }
            }
            var query = 'INSERT INTO employee SET ?'
            const VALUES = {
                first_name: res.firstname,
                last_name: res.lastname,
                role_id: res.role_id
            }
            connection.query(query, VALUES, function (err) {
                if (err) throw err;
                console.log('Employee has been added');
                runSearch()
            })
        })
    })
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'newDep',
            type: 'input',
            message: 'Enter the name of the department you would like to add'
        })
        .then(function (res) {
            var query = 'INSERT INTO department SET?'
            console.log(query)
            var query1 = connection.query(query, [{
                dep_name: res.newDep
            }], function (err) {
                if (err) throw err;
                console.table('Department successfully created')
                runSearch()
            });
        })
}