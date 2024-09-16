const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.post('/auth/login', async (req, res) => {
  const { employeeId, password } = req.body;

  try {

    const employee = await Employee.getById(employeeId);

    if (!employee) {
      return res.status(401).json({ success: false, message: 'Invalid Employee ID' });
    }


    if (employee.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid Employee ID or Password' });
    }


    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
