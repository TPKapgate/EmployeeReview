const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.verifyEmployee);

router.get('/dashboard', employeeController.dashboard);

router.get('/list-reviews', employeeController.listReviews);
router.post('/submit-feedback', employeeController.submitFeedback);

module.exports = router;
