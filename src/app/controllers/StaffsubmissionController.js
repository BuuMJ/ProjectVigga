const Submission = require('../models/Submission');
const {staffMongoseToObject} = require('../../util/mongoose');
const Idea = require('../models/Idea');

class StaffsubmissionController {
  // [GET] /community
  index(req, res, next) {
    Submission.find({})
      .then((submission) => {
        submission = submission.map((submission) => submission.toObject());
        res.render("staffsubmission", {
          submission,
          user: req.user,
          title: "submission",
        });
      })
      .catch(next);
  }

  // [GET] Show detail Submission
  show(req, res, next) {
    Submission.findById(req.params.id)&&Idea.find({})
    .then (
      idea => idea = idea.map((idea) => idea.toObject()),
      submission => 
      res.render("idea", {submission: staffMongoseToObject(submission),
      user: req.user,
      })
    )
    .catch(next);

  }
}

module.exports = new StaffsubmissionController();