const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => res.render('employee/login')); // Render login page
router.post('/login', authController.login);

router.get('/register', (req, res) => res.render('employee/register')); // Render register page
router.post('/register', authController.register); // Handle registration

module.exports = router;
