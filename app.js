const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");

//empty array to store member data
const memberArray = [];

//empty array to store team name
const teamNameArray = [];

//runs add manager function to start inquierer prompt chain
createTeam();

//create team function, sets team name
const createTeam = () => {
    inquirer.prompt([

        //inquierer questions
        {
            type: "input",
            message: "Welcome to Team Profile Generator! Please Enter your new team name",
            name: "teamName"
        }
    ])
        .then(answers => {

            //creates team name from inquirer user input
            const teamName = answers.teamName

            //push team name to team array
            teamNameArray.push(teamName)

            //run add manager function
            addManager();
        })
}

//add manager function
const addManager = () => {
    inquirer.prompt([

        //inquierer questions
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your id manager's number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email"
        },
        {
            type: "number",
            message: "What is your manager's office number?",
            name: "officeNumber"
        }

    ]).then(answers => {

        //create new manager to push to array using inquirer answers and manager class
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);

        //push manager to team array
        memberArray.push(newManager);

        //run add member function
        addAnotherMember();
    });
}

//add engineer function
const addEngineer = () => {
    inquirer.prompt([

        //inquierer questions
        {
            type: "input",
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your engineer's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your engineer's github name?",
            name: "github"
        }

    ]).then(answers => {

        //creates engineer to push to array using inquirer answers and engineer class
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);

        //pushes new engineer into team array
        memberArray.push(newEngineer);

        //runs confirm add member function
        addAnotherMember();
    });
}

//add intern function
const addIntern = () => {
    inquirer.prompt([

        //inquierer questions
        {
            type: "input",
            message: "What is your intern's name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your intern's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What school is your intern attending?",
            name: "school"
        }

    ]).then(answers => {

        //creates new intern to push to array using inquirer answers and intern class
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);

        //pushes new engineer into team array
        memberArray.push(newIntern);

        //runs add member function
        addAnotherMember();
    });
}

//confirm add member function
const addAnotherMember = () => {
    inquirer.prompt([

        //inquierer questions
        {
            type: "list",
            message: `Team member added, would you like to add another? Select "No" to generate team profile`,
            choices: ["Yes", "No"],
            name: "addAnother"
        }
    ]).then(answers => {

        //runs add new member function if user input = yes
        if (answers.addAnother === "Yes") {
            addMember();
        }

        //runs generate function if user input = no
        if (answers.addAnother === "No") {
            generateHTML();
            console.log("Team profile generated!")
        }
    });
}

//add member function
const addMember = () => {
    inquirer.prompt([

        {
            type: "list",
            message: "What kind of team member would you like to add?",
            choices: ["Engineer", "Intern"],
            name: "type"
        }
    ])
        .then(answers => {

            //if user selects engineer run add engineer function
            if (answers.type === "Engineer") {
                addEngineer();
            }

            //if user chooses intern run add intern function
            if (answers.type === "Intern") {
                addIntern();
            }
        });
}




/////////////////////////////html generation///////////////////////////////////////


//base HTML template
let topHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team Profile</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
    <div class="header">
        <h1>Team Members:</h1>
    </div>
    <div class="card-container">
        
`

//html closing  tags
const closingTagsHTML = `
</body>
</html>
`


//generate team html card function
const generateHTML = async () => {

    console.log(memberArray);

    //cycles through team array
    memberArray.forEach(member => {

        //if member role is manager
        if (member.role === "Manager") {

            //card HTML
            const managerCardHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Name: ${member.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Role: ${member.role}</h2>
                    <p class="card-text">ID: ${member.id}</p> 
                    <p class="card-text">Email: ${member.email}</p>
                    <p class="card-text">Office Number: ${member.officeNumber}</p>       
                </div>
            </div>`

            //adds managerCard html to html Template
            topHTML += managerCardHTML;

        }

        //if member role is engineer
        if (member.role === "Engineer") {

            //card HTML
            const engineerCardHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Name: ${member.name}</h1>
                    <h6 class="card-subtitle mb-2 text-muted">Role: ${member.role}</h2>
                    <p class="card-text">ID: ${member.id}</p> 
                    <p class="card-text">Email: ${member.email}</p>
                    <p class="info">Engineer Github Username: ${member.githubUsername}</p>       
                </div>
            </div>`

            //adds engineerCard html to html Template
            topHTML += engineerCardHTML;
        }

        //if member role is intern
        if (member.role === "Intern") {

            //card HTML
            const engineerCardHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Name:${member.name}</h1>
                    <h6 class="card-subtitle mb-2 text-muted">Role: ${member.role}</h2>
                    <p class="card-text">ID: ${member.id}</p> 
                    <p class="card-text">Email: ${member.email}</p>
                    <p class="info">School: ${member.school}</p>       
                </div>
            </div>`

            //adds newCard html to html Template
            topHTML += engineerCardHTML;
        }
    });

    topHTML += closingTagsHTML;


    //creates html file
    fs.writeFile("teams/" + teamNameArray[0] + ".html", topHTML, err => {
        if (err) throw err;
    })
}