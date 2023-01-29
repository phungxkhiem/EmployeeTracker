const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./DB");
require("console.table");

function rallyUptheTeam() {
  startUp();
  function startUp() {
    const longText =
      "This app is intended to help you keep your employees organized! ";

    console.log(
      logo({
        name: "Lets Track Them!",
        font: "DOS Rebel",
        lineChars: 14,
        padding: 4,
        margin: 4,
        borderColor: "bold-cyan",
        logoColor: "bold-magenta",
        textColor: "bold-green",
      })
        .emptyLine()
        .center("Lets get started!")
        .right("  Created by: Khiem Phung ")
        .emptyLine()
        .center(longText)
        .render()
    );
    letsGetOrganized();
  }

  function letsGetOrganized() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "next",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Add Role",
            "Remove Role",
            "Add Department",
            "Remove Department",
            "View Total Utilized Budget By Department",
            "Exit",
          ],
        },
      ])
      .then(function (choice) {
        switch (choice.next) {
          case "View All Employees":
            viewEmpDB();
            break;
          case "View All Employees By Department":
            viewEmployeesByDepartment();
            break;
          case "View All Employees By Manager":
            viewEmployeesByManager();
            break;
          case "View All Roles":
            viewRoles();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employee":
            removeEmployee();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Update Employee Manager":
            updateEmployeeManager();
            break;
          case "View All Departments":
            viewDepartments();
            break;
          case "Add Role":
            addRole();
            break;
          case "Remove Role":
            removeRole();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Remove Department":
            removeDepartment();
            break;
          case "View Total Utilized Budget By Department":
            viewUtilizedBudgetByDepartment();
            break;
          default:
            console.log("You have succesfully exited out of this application!");
            process.exit();
        }
      });
  }

  function viewEmpDB() {
    db.searchAllEmpInfo()
      .then(([rows]) => {
        let employees = rows;
        console.table(employees);
      })
      .then(() => letsGetOrganized());
  }

  function viewEmployeesByDepartment() {
    db.searchDepInfo().then(([rows]) => {
      let departments = rows;
      const allDepartments = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: allDepartments,
          },
        ])
        .then((res) => db.searchEmpsbyDepInfo(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.table(employees);
        })
        .then(() => letsGetOrganized());
    });
  }

  function viewEmployeesByManager() {
    db.searchAllEmpInfo().then(([rows]) => {
      let managers = rows;
      const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "managerId",
            message: "Select an employee",
            choices: managerChoices,
          },
        ])
        .then((res) => db.findAllEmployeesByManager(res.managerId))
        .then(([rows]) => {
          let employees = rows;
          if (employees.length === 0) {
            console.log("Select an employee to see who they report to.");
          } else {
            console.table(employees);
          }
        })
        .then(() => letsGetOrganized());
    });
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "first_name",
          message: "What's the new employee's first name?",
        },
        {
          name: "last_name",
          message: "What's the new employee's last name?",
        },
      ])
      .then((res) => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        db.searchRolesInfo().then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt({
              type: "list",
              name: "roleId",
              message:
                "What role would you like to assign to the new employee?",
              choices: roleChoices,
            })
            .then((res) => {
              let roleId = res.roleId;

              db.searchAllEmpInfo().then(([rows]) => {
                let employees = rows;
                const managerChoices = employees.map(
                  ({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                  })
                );
                managerChoices.unshift({ name: "None", value: null });

                inquirer
                  .prompt({
                    type: "list",
                    name: "managerId",
                    message:
                      "Select a manager to be assigned to this employee.",
                    choices: managerChoices,
                  })
                  .then((res) => {
                    let employee = {
                      manager_id: res.managerId,
                      role_id: roleId,
                      first_name: firstName,
                      last_name: lastName,
                    };
                    db.createEmployee(employee);
                  })
                  .then(() =>
                    console.log(
                      `You have succesfully added ${firstName} ${lastName} to the employee database!`
                    )
                  )
                  .then(() => letsGetOrganized());
              });
            });
        });
      });
  }

  function removeEmployee() {
    db.searchAllEmpInfo().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message:
              "Select the employee you would like to remove from the database.",
            choices: employeeChoices,
          },
        ])
        .then((res) => db.removeEmployee(res.employeeId))
        .then(() => console.log("Employee has been removed from the database."))
        .then(() => letsGetOrganized());
    });
  }
  function updateEmployeeRole() {
    db.searchAllEmpInfo().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select an employee to change their role.",
            choices: employeeChoices,
          },
        ])
        .then((res) => {
          let employeeId = res.employeeId;
          db.searchRolesInfo().then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id,
            }));

            inquirer
              .prompt([
                {
                  type: "list",
                  name: "roleId",
                  message:
                    "Which role do you want to assign the selected employee?",
                  choices: roleChoices,
                },
              ])
              .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
              .then(() =>
                console.log("You have succesfully updated the employee's role.")
              )
              .then(() => letsGetOrganized());
          });
        });
    });
  }
  //
  function updateEmployeeManager() {
    db.searchAllEmpInfo().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee's manager do you want to update?",
            choices: employeeChoices,
          },
        ])
        .then((res) => {
          let employeeId = res.employeeId;
          db.findAllPossibleManagers(employeeId).then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(
              ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
              })
            );

            inquirer
              .prompt([
                {
                  type: "list",
                  name: "managerId",
                  message:
                    "Which employee do you want to set as manager for the selected employee?",
                  choices: managerChoices,
                },
              ])
              .then((res) =>
                db.updateEmployeeManager(employeeId, res.managerId)
              )
              .then(() =>
                console.log("You have succesfully updated employee's manager")
              )
              .then(() => letsGetOrganized());
          });
        });
    });
  }

  function viewRoles() {
    db.searchRolesInfo()
      .then(([rows]) => {
        let roles = rows;
        console.table(roles);
      })
      .then(() => letsGetOrganized());
  }

  function addRole() {
    db.searchDepInfo().then(([rows]) => {
      let departments = rows;
      const allDepartments = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      inquirer
        .prompt([
          {
            name: "title",
            message: "What is the name of the new role you would like to add?",
          },
          {
            name: "salary",
            message: "What is the salary assigned to this new role?",
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department would you like to add this role to?",
            choices: allDepartments,
          },
        ])
        .then((role) => {
          db.createRole(role)
            .then(() =>
              console.log(
                `You have succesfully added ${role.title} to the employee database.`
              )
            )
            .then(() => letsGetOrganized());
        });
    });
  }
  function removeRole() {
    db.searchRolesInfo().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "roleId",
            message:
              "You have selected to deleted a role from the employee database. Keep in mind that when you delete a role the fiel!",
            choices: roleChoices,
          },
        ])
        .then((res) => db.removeRole(res.roleId))
        .then(() =>
          console.log(
            "You have succesfully deleted this role from the employee database."
          )
        )
        .then(() => letsGetOrganized());
    });
  }
  function viewDepartments() {
    db.searchDepInfo()
      .then(([rows]) => {
        let departments = rows;
        console.table(departments);
      })
      .then(() => letsGetOrganized());
  }
  function addDepartment() {
    inquirer
      .prompt([
        {
          name: "name",
          message: "What is the name of the department?",
        },
      ])
      .then((res) => {
        let name = res;
        db.createDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => letsGetOrganized());
      });
  }
  function removeDepartment() {
    db.searchDepInfo().then(([rows]) => {
      let departments = rows;
      const allDepartments = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      inquirer
        .prompt({
          type: "list",
          name: "departmentId",
          message:
            "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
          choices: allDepartments,
        })
        .then((res) => db.removeDepartment(res.departmentId))
        .then(() =>
          console.log(`You have removed department from the employee database.`)
        )
        .then(() => letsGetOrganized());
    });
  }

  function viewUtilizedBudgetByDepartment() {
    db.viewDepartmentBudgets()
      .then(([rows]) => {
        let departments = rows;
        console.table(departments);
      })
      .then(() => letsGetOrganized());
  }
}
rallyUptheTeam();
