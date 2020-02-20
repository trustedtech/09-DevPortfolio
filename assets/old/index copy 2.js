const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
var generateHTML = require('./generateHTML.js');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    'Enter the GitHub username:', 
    'Choose your color preference:'  
];

async function getDev() {
    try {
        const { username, colorpref } = await inquirer.prompt([
            {
                message: questions[0],
                name: "username"
            },
            {
                type: "list",
                message: questions[1],
                name: "colorpref",
                choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]}
        ]);

        const queryUrl = `https://api.github.com/users/${username}`;

        const { data } = await axios.get(queryUrl);

        // console.log(username);
        // console.log(colorpref);
        // console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

// getDev()
//     .then( generateHTML(data) )
//     .then( writeFileAsync("devprofile.pdf", body,'binary') );