const mysql = require("mysql2");

const connectEmpDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kimchi510!",
  database: "employeesdb"
});

connectEmpDB.connect(function (err) {
  if (err) throw err;
});

class DB {
  constructor(connectEmpDB) {
    this.connectEmpDB = connectEmpDB;
  }
  searchAllEmpInfo() {
    return this.connectEmpDB.promise().query( "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
  }
  searchDepInfo() {
    return this.connectEmpDB.promise().query("SELECT department.id, department.name FROM department;");
  }
  searchEmpsbyDepInfo(departmentId) {
    return this.connectEmpDB.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",departmentId);
  }
  findAllEmployeesByManager(managerId) {
    return this.connectEmpDB.promise().query("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",managerId);
  }
  searchRolesInfo() {
    return this.connectEmpDB.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
  }
  findAllPossibleManagers(employeeId) {
    return this.connectEmpDB.promise().query( "SELECT id, first_name, last_name FROM employee WHERE id != ?", employeeId);
  }
  createEmployee(employee) {
    return this.connectEmpDB.promise().query("INSERT INTO employee SET ?", employee);
  }
  createRole(role) {
    return this.connectEmpDB.promise().query("INSERT INTO role SET ?", role);
  }
  createDepartment(department) {
    return this.connectEmpDB.promise().query("INSERT INTO department SET ?", department);
  }
  updateEmployeeRole(employeeId, roleId) {
    return this.connectEmpDB.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
  }
  updateEmployeeManager(employeeId, managerId) {
    return this.connectEmpDB.promise().query("UPDATE employee SET manager_id = ? WHERE id = ?",[managerId, employeeId]);
  }
  removeRole(roleId) {
    return this.connectEmpDB.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }
  removeEmployee(employeeId) {
    return this.connectEmpDB.promise().query("DELETE FROM employee WHERE id = ?",employeeId);
  }
  removeDepartment(departmentId) {
    return this.connectEmpDB.promise().query("DELETE FROM department WHERE id = ?",departmentId);
  }
  viewDepartmentBudgets() {
    return this.connectEmpDB.promise().query("SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;");
  }

}

module.exports = new DB(connectEmpDB);