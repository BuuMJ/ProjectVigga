const path = require("path");
const nodemailer = require("nodemailer");
const Account = require("../models/Account");
const { userMongooseToObject } = require("../../util/userMongoose");
const bcrypt = require("bcrypt");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
  dataDepartment,
} = require("../../util/authonize");

class UserController {
  //[GET] user
  index(req, res, next) {
    Account.find({})
      .then((account) => {
        account = account.map((account) => account.toObject());
        res.render("user", {
          account,
          user: req.user,
          title: "User",
          data: data,
        });
      })
      .catch(next);
  }

  // [GET] edit user
  editUser(req, res, next) {
    Account.findById(req.params.id)
      .then((account) =>
        res.render("editUser", {
          account: userMongooseToObject(account),
          user: req.user,
          data: data,
        })
      )
      .catch(next);
  }

  // [PUT] Edit User
  updateUser(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    Account.updateOne({ _id: req.params.id }, {password: hash,
    username: req.body.username,
  adremail: req.body.adremail,
fullname: req.body.fullname,
role: req.body.role,
department: req.body.department})
      .then(() => res.redirect("/user"))
      .catch((error) => {});
  }

  // [DELETE] Delete User
  deleteUser(req, res, next) {
    Account.deleteOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/user"))
      .catch(next);
  }
}

module.exports = new UserController();
