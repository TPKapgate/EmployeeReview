const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

exports.verifyEmployee = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Employee.findById(decoded.id);
    next();
  } catch (error) {
    res.clearCookie('token');
    res.redirect('/auth/login');
  }
};

exports.verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Employee.findById(decoded.id);
    if (user && user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.clearCookie('token');
      res.redirect('/auth/login');
    }
  } catch (error) {
    res.clearCookie('token');
    res.redirect('/auth/login');
  }
};
