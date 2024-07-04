const Employee = require('../models/Employee');
const PerformanceReview = require('../models/PerformanceReview');

exports.addEmployee = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const employee = new Employee({ name, email, password, isAdmin });
    await employee.save();
    res.redirect('/admin/view-employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.viewEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('admin/viewEmployees', { employees });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.addPerformanceReview = async (req, res) => {
  const { employeeId, reviewers } = req.body;
  try {
    const performanceReview = new PerformanceReview({ employee: employeeId, reviewers });
    await performanceReview.save();
    res.redirect('/admin/view-performance-reviews');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.viewPerformanceReviews = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find().populate('employee').populate('reviewers');
    res.render('admin/viewPerformanceReviews', { performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.dashboard = async (req, res) => {
  try {
    const employees = await Employee.find();
    const performanceReviews = await PerformanceReview.find().populate('employee').populate('reviewers');
    res.render('admin/dashboard', { employees, performanceReviews });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
