var fs = require('fs');
var render = require('./htmlrender');
var inquirer = require('inquirer');

  function questions () {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What's you name?",
      }
    ]).then((response) => {
      console.log("Response: ", response)
    })
  }
  
  questions ();
//Use render file and prompt to generate html:
