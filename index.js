const inquirer = require("inquirer")
const db = require("./db")
const mainQuestions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            { name: "view all employess", value: "VIEW_EMPLOYEES" },
            { name: "view all departments", value: "VIEW_DEPARTMENTS" },
            { name: "view all roles", value: "VIEW_ROLES" },
            { name: "add a department", value: "ADD_DEPARTMENT" },
            { name: "add a role", value: "ADD_ROLE" },
            { name: "add an employee ", value: "ADD_EMPLOYEE" },
        ]
    }]
function main() {
    inquirer.prompt(mainQuestions).then(answers => {

        switch (answers.option) {

            case "VIEW_EMPLOYEES":
                viewEmployees()
                break
            case "VIEW_DEPARTMENTS":
                viewDepartments()
                break
            case "VIEW_ROLES":
                viewRoles()
                break
            case "ADD_DEPARTMENT":
                addDepartment()
                break
            case "ADD_ROLE":
                addRole()
                break
            case "ADD_EMPLOYEE":
                addEmployee()
        }

    })
}
main()

const viewEmployees = () => {

    db.viewEmployees().then(([rows]) => {

        console.table(rows)

    }).then(() => { main() })

}
const viewDepartments = () => {

    db.viewDepartments().then(([rows]) => {

        console.table(rows)
    }).then(() => { main() })

}
const viewRoles = () => {

    db.viewRoles().then(([rows]) => {

        console.table(rows)
    }).then(() => { main() })
}

const addDepartment = () => {
    inquirer.prompt([{

        name: "name",
        type: "input",
        message: "What is the name of the department would you like to add?",

    }]).then(answer => {

        db.addDepartment(answer.name).then(([rows]) => {

            console.table(rows)


        }).then(() => { main() })
    }
    )
}
const addRole = () => {

    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the title of the role would you like to add?",
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?",
},
{
    name: "department",
    type: "input",
    message: "What is the name of the department?",
}
]).then(answer => {

        db.addRole(answer.name, answer.salary, answer.department).then(([rows]) => {

            console.table(rows)


        }).then(() => { main() })
    }
    )
}
const addEmployee = () => {
    inquirer.prompt([{
    
        name: "firstname",
        type: "input",
        message: "What is the first name of the Employee would you like to add?",
    },
    {
        name: "lastname",
        type: "input",
        message: "What is the last name of the Employee would you like to add?",

    },
    {
        name: "role",
        type: "input",
        message: "What is the role of the Employee would you like to add?",
    },
    {
        name: "manager",
        type: "input",
        message: "What is the first name of the manager would you like to add?",
    }
]).then(answer => {

        db.addEmployee(answer.firstname, answer.lastname,answer.role,answer.manager).then(([rows]) => {

            console.table(rows)


        }).then(() => { main() })
    }
    )
}