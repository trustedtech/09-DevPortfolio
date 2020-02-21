const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require('./generateHTML');
const pdf = require('html-pdf');
const options = { format: 'Letter' };

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    'Enter the GitHub username:', 
    'Choose your color preference:'  
];

function getInput() {
    return inquirer.prompt([
    {
        type: "input",
        message: questions[0],
        name: "username"
    },
    {
        type: "list",
        message: questions[1],
        name: "color",
        choices: [
        "green",
        "blue",
        "pink",
        "red"
    ]}])
}

async function getGitProf(res) {
    try {
        const { username, color } = res;
        // console.log("username: " + username);
        // console.log("color: " + color);

        const queryUrl = `https://api.github.com/users/${username}`;

        const { data } = await axios.get(queryUrl);

        data.color = color;

        return data;
    }
    catch (err) {
        console.log(err);
    }
}

function makePDF() {
    const doc = new jsPDF();
 
    doc.text('Hello world!', 10, 10)
    doc.save('devprofile.pdf')
}

getInput()
    .then(function(res){ 
        const data = getGitProf(res);
        return data; })
    .then(function(data){ 
        console.log("data: " + JSON.stringify(data)); 
        const html = generateHTML.doit(data);
        return html; })
    .then(function(html){
        // console.log(html); 
        pdf.create(html, options).toFile('./devprofile.pdf', function(err, res) {
            if (err) return console.log(err);
            // console.log(res); // { filename: '/app/businesscard.pdf' }
        }); 
    })
    .catch(function(err) {
        console.log(err);
    }
);