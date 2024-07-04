const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.verifyAdmin);

router.get('/dashboard', adminController.dashboard);

router.post('/add-employee', adminController.addEmployee);
router.get('/view-employees', adminController.viewEmployees);
router.post('/add-performance-review', adminController.addPerformanceReview);
router.get('/view-performance-reviews', adminController.viewPerformanceReviews);

module.exports = router;
