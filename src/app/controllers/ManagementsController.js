const Category = require("../models/Category");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const Submission = require("../models/Submission");
const Department = require("../models/Department");
const querystring = require('querystring');

class ManagementsController {
  // [GET] category
  category(req, res, next) {
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
    res.render("createCategory", {
      title: "Create Category",
      user: req.user,
    });
  }

  //[POST] Create Category
  store(req, res, next) {
    var name = req.body.name;
    Category.findOne({ name: name }).then((data) => {
      if (data) {
        const message = "Category already exists!";
        const url = "/managements/category?" + querystring.stringify({ message: message });
        res.redirect(url);
      } else {
        const category = new Category(req.body);
        category
          .save()
          .then(() => res.redirect("category"))
          .catch((error) => {});
      }
    });
  }

  //[GET] Edit category
  edit(req, res, next) {
    Category.findById(req.params.id)
      .then((category) =>
        res.render("editCategory", {
          title: "Edit Category",
          category: mongooseToObject(category),
          user: req.user,
        })
      )
      .catch(next);
  }

  //[PUT] Update category
  update(req, res, next) {
    var name = req.body.name;
    Category.findOne({ name: name }).then((data) => {
      if (data) {
        const message = "Category already exists!";
        const url = "/managements/category?" + querystring.stringify({ message: message });
        res.redirect(url);
      } else {
        Category.updateOne({ _id: req.params.id }, req.body)
          .then(() => res.redirect("category"))
          .catch((error) => {});
      }
    });
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
        // submission.date = submission.toDateString();
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
    var name = req.body.name;
    Submission.findOne({ name: name }).then((data) => {
      if (data) {
        const message = "Submission already exists!";
        const url =
          "/managements/submission?" +
          querystring.stringify({ message: message });
        res.redirect(url);
      } else {
        req.body.department = req.user.department;
        console.log(req.body.department + 'tat ca la o cho nayyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
        const submission = new Submission(req.body);
        submission
          .save()
          .then(() => res.redirect("/managements/submission"))
          .catch((error) => {});
      }
    });
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
    var name = req.body.name;
    Submission.findOne({ name: name }).then((data) => {
      if (data) {
        const message = "Submission already exists!";
        const url =
          "/managements/submission?" +
          querystring.stringify({ message: message });
        res.redirect(url);
      } else {
        Submission.updateOne({
          deadline_1: req.body.deadline_1,
          deadline_2: req.body.deadline_2,
         })
          .then(() => res.redirect("/managements/submission"))
          .catch((error) => {});
      }
    });
  }

  // [Delete] Delete Submission
  deleteSubmission(req, res, next) {
    Submission.deleteOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/managements/submission"))
      .catch(next);
  }
  // [GET] Department
  department(req, res, next) {
    Department.find({})
      .then((department) => {
        department = department.map((department) => department.toObject());
        res.render("department", {
          title: "Department",
          department: department,
          user: req.user,
        });
      })
      .catch(next);
  }

  // [GET] Create Department
  createDepartment(req, res, next) {
    res.render("createDepartment", {
      title: "Create Department",
      user: req.user,
    });
  }

  // [POST] Create Department
  storeDepartment(req, res, next) {
    var name = req.body.name;
    Department.findOne({ name: name }).then((data) => {
      if (data) {
        const message = "Department already exists!";
        const url =
          "/managements/department?" +
          querystring.stringify({ message: message });
        res.redirect(url);
      } else {
        const department = new Department(req.body);
        department
          .save()
          .then(() => res.redirect("/managements/department"))
          .catch((error) => {});
      }
    });
  }

  // [GET] Edit Department
  editDepartment(req, res, next) {
    Department.findById(req.params.id)
      .then((department) =>
        res.render("editDepartment", {
          title: "Edit Department",
          user: req.user,
          department: mongooseToObject(department),
        })
      )
      .catch(next);
  }

  // [PUT] Update Department
  updateDepartment(req, res, next) {
    var name = req.body.name;
    Department.findOne({ name: name }).then((data) => {
      if (data) {
        const message = "Department already exists!";
        const url =
          "/managements/department?" +
          querystring.stringify({ message: message });
        res.redirect(url);
      } else {
        Department.updateOne({ _id: req.params.id }, req.body)
          .then(() => res.redirect("/managements/department"))
          .catch((error) => {});
      }
    });
  }

  // [DELETE] Delete Department
  deleteDepartment(req, res, next) {
    Department.deleteOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/managements/Department"))
      .catch(next);
  }
}

module.exports = new ManagementsController();