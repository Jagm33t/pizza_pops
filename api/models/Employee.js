const knex = require('../knex');

class Employee {
  static async getById(employeeId) {
    return knex('employees').where({ id: employeeId }).first();
  }
}

module.exports = Employee;
