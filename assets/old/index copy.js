const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    'Enter the GitHub username:', 
    'Choose your color preference:'  
];

async function getDev() {
    try {
        const { username } = await inquirer.prompt(
            {
                message: questions[0],
                name: "username"
        });

        const { colorpref } = await inquirer.prompt(
            {
                type: "list",
                message: questions[1],
                name: "colorpref",
                choices: [
                "green",
                "blue",
                "pink",
                "red"
        ]});

        const queryUrl = `https://api.github.com/users/${username}`;

        const data = await axios.get(queryUrl);

        console.log(data);

    }
    catch (err) {
        console.log(err);
    }
}

getDev();

// inquirer
//     .prompt([
//         { 
//             message: questions[0],
//             name: "username" 
//         },
//         { 
//             type: "list",
//             message: questions[1],
//             name: "colorpref",
//             choices: [
//                 "green",
//                 "blue",
//                 "pink",
//                 "red"
//             ]
//         }
//     ])
//     .then(function({ username }) {
    // const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    // axios.get(queryUrl).then(function(res) {
    //   const repoNames = res.data.map(function(repo) {
    //     return repo.name;
    //   });

    //   const repoNamesStr = repoNames.join("\n");

    //   fs.writeFile("repos.txt", repoNamesStr, function(err) {
    //     if (err) {
    //       throw err;
    //     }

    //     console.log(`Saved ${repoNames.length} repos`);

    //   });