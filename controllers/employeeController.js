const PerformanceReview = require('../models/PerformanceReview');

exports.listReviews = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find({ reviewers: req.user.id }).populate('employee');
    res.render('employee/listReviews', { performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.submitFeedback = async (req, res) => {
  const { reviewId, feedback } = req.body;
  try {
    const performanceReview = await PerformanceReview.findById(reviewId);
    performanceReview.feedbacks.push({ reviewer: req.user.id, feedback });
    await performanceReview.save();
    res.redirect('/employee/list-reviews');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.dashboard = async (req, res) => {
  try {
    const reviewsToFeedback = await PerformanceReview.find({ reviewers: req.user._id }).populate('employee');
    res.render('employee/dashboard', { reviewsToFeedback });
  } catch (error) {
    res.status(500).send('Server error');
  }
};