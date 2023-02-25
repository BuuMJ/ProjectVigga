const path = require("path");
const nodemailer = require("nodemailer");
const Account = require("../models/Account");
const { userMongooseToObject } = require("../../util/userMongoose");
const bcrypt = require("bcrypt");

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
        })
      )
      .catch(next);
  }

  // [PUT] Edit User
  updateUser(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    Account.updateOne({ _id: req.params.id }, req.body, { hash })
      .then(() => res.redirect("/user"))
      .catch((error) => {});
  }

  // [DELETE] Delete User
  deleteUser(req, res, next) {
    Account.deleteOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/user"))
      .catch(next);
  }

  //[Post] send mail comments
  async comment(req, res, next) {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nxt03091999@gmail.com",
        pass: "magdbcqxrtndtach",
      },
    });

    var mailOptions = {
      to: req.body.receiver,
      subject: "Sending Email using Node.js",
      text: req.body.comment,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = new UserController();
