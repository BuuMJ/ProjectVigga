const path = require("path");
const nodemailer = require("nodemailer");
const Account = require("../models/Account");
const AccountModel = require("../models/Account");
const { userMongooseToObject } = require("../../util/userMongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const bcrypt = require("bcrypt");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
  dataDepartment,
} = require("../../util/authonize");
const { error } = require("console");

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

  //[GET] edit profile
  editProfile(req, res, next) {
    Account.find({})
      .then((account) => {
        account = account.map((account) => account.toObject());
        res.render("editprofile", {
          account,
          user: req.user,
          title: "Profile",
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

  //[PUT] edit user
  async updateProfile(req, res, next) {
    try {
      const password = req.body.password;
      const id = req.user._id;
      //uploads file
      if (req.file) {
        console.log("đã có file");
        // Kiểm tra xem có file được tải lên không
        const data = await fs.promises.readFile(req.file.path); // sửa chỗ này
        if (data) {
          console.log("đã tới đây và có file");
          if (password) {
            console.log("đã tới đây có file và có password");
            const hash = await bcrypt.hash(password, 10);
            const updateUser = await AccountModel.findByIdAndUpdate(
              id,
              {
                password: hash,
                avatar: req.file.filename,
              },
              { new: true }
            );
            res.redirect("/user/profile");
          } else {
            console.log("đã tới đây có file nhưng không có password");
            const updatedUser = await AccountModel.findByIdAndUpdate(
              id,
              {
                avatar: req.file.filename,
              },
              { new: true }
            );
            res.redirect("/user/profile");
          }
        }
      } else {
        console.log("không có file");
        if (password) {
          console.log("đã tới đây không có file nhưng có password");
          const hash = await bcrypt.hash(password, 10);
          const updateUser = await AccountModel.findByIdAndUpdate(
            id,
            {
              password: hash,
            },
            { new: true }
          );
          res.redirect("/user/profile");
        }
      }
    } catch {
      console.log(error);
    }
  }

  // [PUT] Edit User
  async updateUser(req, res, next) {
    try {
      const password = req.body.password;
      const id = req.params.id;
      //uploads file
      if (req.file) {
        console.log("đã có file");
        // Kiểm tra xem có file được tải lên không
        const data = await fs.promises.readFile(req.file.path); // sửa chỗ này
        if (data) {
          console.log("đã tới đây và có file");
          if (password) {
            console.log("đã tới đây có file và có password");
            const hash = await bcrypt.hash(password, 10);
            const updateUser = await AccountModel.findByIdAndUpdate(
              id,
              {
                password: hash,
                username: req.body.username,
                adremail: req.body.adremail,
                fullname: req.body.fullname,
                role: req.body.role,
                department: req.body.department,
                avatar: req.file.filename,
              },
              { new: true }
            );
            res.redirect("/user");
          } else {
            console.log("đã tới đây có file nhưng không có password");
            const updatedUser = await AccountModel.findByIdAndUpdate(
              id,
              {
                username: req.body.username,
                adremail: req.body.adremail,
                fullname: req.body.fullname,
                role: req.body.role,
                department: req.body.department,
                avatar: req.file.filename,
              },
              { new: true }
            );
            res.redirect("/user");
          }
        }
      } else {
        console.log("không có file");
        if (password) {
          console.log("đã tới đây không có file nhưng có password");
          const hash = await bcrypt.hash(password, 10);
          const updateUser = await AccountModel.findByIdAndUpdate(
            id,
            {
              password: hash,
              username: req.body.username,
              adremail: req.body.adremail,
              fullname: req.body.fullname,
              role: req.body.role,
              department: req.body.department,
            },
            { new: true }
          );
          res.redirect("/user");
        } else {
          console.log("đã tới đây khônng có file và không có password");

          const updatedUser = await AccountModel.findByIdAndUpdate(
            id,
            {
              username: req.body.username,
              adremail: req.body.adremail,
              fullname: req.body.fullname,
              role: req.body.role,
              department: req.body.department,
            },
            { new: true }
          );
          res.redirect("/user");
        }
      }
    } catch {
      console.log(error);
    }
  }

  // [DELETE] Delete User
  deleteUser(req, res, next) {
    Account.deleteOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/user"))
      .catch(next);
  }
}

module.exports = new UserController();
