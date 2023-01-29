# Employee Tracker

# Description
The application can be used through a terminal as long as the user has node.js installed. The LTS vesion is recommended. An IDE is also required. More information on this topic is elaborated in the 'installation' section. This application is intended to help the user write notes, save notes, and delete notes. It is easy to use and useful for the user. The user should read through this README to fully comprehend the use of this application and what they need to install for it to work.

# Installation
If the user decides to download the repository, the following dependencies/packages will come with it. The user will still need to download node.js if the user doesn't already have it. An ide is also required to run this application. Visual Studio Code is recommended.

As stated in the description section node.js is needed to run this application.The user will need to the Express package downloaded. Along with Path .Click on the links for further installation instructions. Here is more information on Path. uuid is another package needed to run this application. For more information on npm click on the link to better understand how it functions as a package manager.

# Usage
Now that the user has read through the installation process they can now read through this section to understand the usage. Below is a list of instructions with images for the user to follow to understand how the application is used/runs.

![alt text](./lets%20track%20them.png)

# Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```