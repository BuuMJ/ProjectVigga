const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/Account");

class SiteController {
  // [GET] /home
  home(req, res) {
    res.render("detail", {
      title: "Vigga home",
      user: req.user,
    });
  }
  // [GET] /login
  login(req, res) {
    if (req.user) {
      res.render("/", {
        title: "Login",
      });
    } else {
      res.render("login", {
        title: "Login",
      });
    }
  }
  // [POST] /login
  apilogin(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // console.log('da vao func')
    AccountModel.findOne({
      username: username,
    })
      .then((data) => {
        if (data) {
          // console.log('co ng dung')
          var token = jwt.sign(
            {
              _id: data._id,
            },
            "PW"
          );
          bcrypt.compare(password, data.password, function (err, result) {
            if (err) {
              return res.render("login", {
                msg: "The user or password is incorrect.",
              });
            }
            if (result) {
              res.cookie("token", token, {
                expires: new Date(Date.now() + 1800000),
              });
              // console.log(token)
              // data.username =
              // console.log(data.token )
              // return res.render('home', {
              //   title: 'login failled',
              //   msg: 'Please log in again.',
              //   data
              // })
              return res.redirect("/");
              // return res.json({
              //   loginsuccessMsg: req.flash('dang nhap thanh cong'),
              // });
            } else {
              // return res.json('sai mật khẩu');
              return res.render("login", {
                msg: "The user or password is incorrect.",
              });
            }
          });
        } else {
          // return res.json('sai tai khoan');
          return res.render("login", {
            msg: "The user or password is incorrect.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("loi sever");
      });
  }
}

module.exports = new SiteController();
