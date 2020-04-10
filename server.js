const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Employee = require("./constructor/Employee");
const templatesPath = path.resolve(__dirname, "templates")
const teamTemplate = path.join(templatesPath, "team.html");
const renderEmployees = require("./htmlRenderer");

let employees = [];

function newEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your employee's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your employee's id?",
    }

  ])
  .then(employeeAnswers => {
    const employee = new Employee(employeeAnswers.name, employeeAnswers.id);
    employees.push(employee)
    return mainPrompt();
  });
}

function generateEmployees() {
  if (employees.length > 0) {
    fs.writeFileSync(teamTemplate, renderEmployees(employees), "utf-8");
    return console.log("Employee HTML created!");
  } else {
    return console.log("You have no employees");
  }
}

function mainPrompt() {
  console.log("Please build your team");
  inquirer.prompt([
    {
      type: "list",
      name: "newEmployee",
      message: "Would you like to create an employee?",
      choices: [
        "Yes",
        "No"
      ]
    }
  ])
  .then(userAnswer => {
    switch(userAnswer.newEmployee) {
      case "Yes":
        newEmployee();
        break;
      case "No":
        generateEmployees();
    }
  });
}
mainPrompt();









