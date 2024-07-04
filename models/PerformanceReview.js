const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PerformanceReviewSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  reviewers: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  feedbacks: [{
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    },
    feedback: String
  }]
});

module.exports = mongoose.model('PerformanceReview', PerformanceReviewSchema);
