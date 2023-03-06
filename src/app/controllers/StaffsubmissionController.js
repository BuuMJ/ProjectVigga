const Submission = require("../models/Submission");
const { staffMongoseToObject } = require("../../util/mongoose");
const Idea = require("../models/Idea");
const { dataIdea, dataCategory } = require("../../util/authonize");
const { sendIdSub } = require("../../util/data");
const { submission, department } = require("./ManagementsController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const path = require("path");

class StaffsubmissionController {
  // [GET] staffsubmission
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
    const idSub = req.params.id;
    Submission.findById(idSub)
      .then((submission) => {
        req.session.idSub = idSub;
        console.log(req.session.idSub);
        res.render("idea", {
          submission: staffMongoseToObject(submission),
          user: req.user,
          data,
          title: "Detail submission",
          idSub: req.session.idSub,
        });
      })
      .catch(next);
  }

  // [GET] create Idea
  createIdea(req, res, next) {
    // console.log(req.session.idSub)
    res.render("createIdea", { user: req.user, dataC, title: "Create Idea" });
  }

  // [POST] create Idea
  storeIdea(req, res, next) {
    var department = req.user.department;
    // console.log('idSubmission:' + req.session.idSub)

    const idea = new Idea({
      title: req.body.title,
      brief: req.body.brief,
      content: req.body.content,
      category: req.body.category,
      submission: req.session.idSub,
      department: department,
    });

    if (req.file) {
      // Kiểm tra xem có file được tải lên không
      fs.readFile(req.file.path, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          idea
            .save()
            .then(() => {
              res.redirect("/staffsubmission");
            })
            .catch(next);
        }
      });
    } else {
      idea
        .save()
        .then(() => {
          res.redirect("/staffsubmission");
        })
        .catch(next);
    }
  }

  // [POST] Like Idea
  async like(req, res, next) {
    try {
      const idea = await Idea.findById(req.params.id);
      data, idea.like++;
      await idea.save();
      // res.render("idea");
      res.redirect("/staffsubmission");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [POST] Dislike Idea
  async dislike(req, res, next) {
    try {
      const idea = await Idea.findById(req.params.id);
      idea.dislike++;
      await idea.save();
      res.redirect("/staffsubmission");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [GET] detail idea
  detail(req, res, next) {
    Idea.findById(req.params.id)
      .then((idea) =>
        res.render("detail", {
          idea: staffMongoseToObject(idea),
          user: req.user,
          title: "Detail",
        })
      )
      .catch(next);
  }

  // [POST] View Idea
  async view(req, res) {
    try {
      const idea = await Idea.findById(req.params.id);
      idea.view++;
      await idea.save();
      res.render("detail", {
        idea: staffMongoseToObject(idea),
        user: req.user,
        title: "Detail",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [POST] comment idea
  async comment(req, res) {
    try {
      const idea = await Idea.findById(req.params.id);
      idea.comment.push({
        username: req.body.username,
        contentCM: req.body.content,
      });
      await idea.save();
      res.render("detail", {
        idea: staffMongoseToObject(idea),
        user: req.user,
        title: "Detail",
        data,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new StaffsubmissionController();