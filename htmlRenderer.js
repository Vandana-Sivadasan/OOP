// Use fs to generate html:
const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "./templates");
const mainTemplate = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");

const renderEmployees = employees => {
  let newHTML = [];
  newHTML.push(employees.map(employee => generateHTML(employee)));
  newHTML.join("")
  return replaceHTMLPlaceholders(mainTemplate, "team", newHTML);
}


const generateHTML = employeeInfo => {
  let employeeTemplate = fs.readFileSync(path.resolve(templatesDir, "employee.html"), "utf8");
  employeeTemplate = replaceHTMLPlaceholders(employeeTemplate, "name", employeeInfo.name);
  employeeTemplate = replaceHTMLPlaceholders(employeeTemplate, "id", employeeInfo.id);
  return employeeTemplate;

};

const replaceHTMLPlaceholders = (htmlTemplate, placeholder, value) => {
  const replacePlaceholder = new RegExp("{{ " + placeholder + " }}", "gm");
  return htmlTemplate.replace(replacePlaceholder, value);

};

module.exports = renderEmployees;
