const Submission = require('../models/Submission');
const {staffMongoseToObject} = require('../../util/mongoose');
const Idea = require('../models/Idea');
const {dataIdea, dataCategory} = require('../../util/authonize');



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
    Submission.findById(req.params.id)
    .then (
      submission => 
      res.render("idea", {submission: staffMongoseToObject(submission),
      user: req.user,
      data,
      })
    )
    .catch(next);

  }

  // [GET] create Idea
  createIdea(req, res, next) {
    res.render("createIdea", 
    {user: req.user},
    dataC,
    );
  }

  // [POST] create Idea
  storeIdea(req, res, next) {
    const idea = new Idea(req.body);
    idea.save()
      .then(() => res.redirect("/idea"))
      .catch((error) => {});
  }

  // [GET] detail idea
  detail(req, res, next) {
    Idea.findById(req.params.id)
    .then (
      idea => res.render("detail", {idea: staffMongoseToObject(idea),
      user: req.user,
      })
    )
    .catch(next);
  }
}

module.exports = new StaffsubmissionController();