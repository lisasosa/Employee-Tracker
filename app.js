const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: '',
});