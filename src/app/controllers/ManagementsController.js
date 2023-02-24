const Category = require("../models/Category");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const Submission = require("../models/Submission");

class ManagementsController {
  // [GET] category
  category(req, res, next) {
    //res.render("category");
    // [Read Category]
    Category.find({})
      .then((category) => {
        category = category.map((category) => category.toObject());
        res.render("category", {
          category,
          user: req.user,
          title: "Category",
        });
      })
      .catch(next);
  }

  //[GET] createCategory]
  create(req, res, next) {
    // res.json(req.body);
    res.render("create", {
      title: "Create Category",
      user: req.user,
    });
  }

  //[POST] Create Category
  store(req, res, next) {
    const category = new Category(req.body);
    category
      .save()
      .then(() => res.redirect("category"))
      .catch((error) => {});
  }

  //[GET] Edit category
  edit(req, res, next) {
    Category.findById(req.params.id)
      .then((category) =>
        res.render("edit", {
          category: mongooseToObject(category),
          user: req.user,
          title: "Edit Category",
        })
      )
      .catch(next);
  }

  //[PUT] Update category
  update(req, res, next) {
    Category.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("category"))
      .catch((error) => {});
  }

  //[DELETE] delete category
  delete(req, res, next) {
    Category.deleteOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("category"))
      .catch(next);
  }

  // [GET] Submission
  submission(req, res, next) {
    Submission.find({})
      .then((submission) => {
        submission = submission.map((submission) => submission.toObject());
        res.render("submission", {
          title: "Submission",
          user: req.user,

          submission,
        });
      })
      .catch(next);
  }

  // [GET] Create Submission
  createSubmission(req, res, next) {
    res.render("createSubmission", {
      title: "Create Submission",
      user: req.user,
    });
  }

  // [POST] Create Submission
  storeSubmission(req, res, next) {
    const submission = new Submission(req.body);
    submission
      .save()
      .then(() => res.redirect("/managements/submission"))
      .catch((error) => {});
  }

  // [GET] Edit Submission
  editSubmission(req, res, next) {
    Submission.findById(req.params.id)
      .then((submission) =>
        res.render("editSubmission", {
          submission: mongooseToObject(submission),
          title: "Edit Submission",
          user: req.user,
        })
      )
      .catch(next);
  }

  // [PUT] Update Submission
  updateSubmission(req, res, next) {
    Submission.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/managements/submission"))
      .catch((error) => {});
  }

  // [Delete] Delete Submission
  deleteSubmission(req, res, next) {
    Submission.deleteOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/managements/submission"))
      .catch(next);
  }
  // [GET] department
  department(req, res) {
    res.render("department", {
      title: "Deparment",
      user: req.user,
    });
  }
}

module.exports = new ManagementsController();
