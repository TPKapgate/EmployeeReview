const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

// Register a new employee
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).send('Employee already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      isAdmin: false, // Default isAdmin to false
    });

    await newEmployee.save();
    res.redirect('/auth/login'); // Redirect to login page after registration
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Login an employee
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: employee._id, isAdmin: employee.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    
    if (employee.isAdmin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/employee/dashboard');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};
