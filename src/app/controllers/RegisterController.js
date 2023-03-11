const bcrypt = require("bcrypt");
const AccountModel = require("../models/Account");
const querystring = require('querystring')
class RegisterController {
  // [GET] /register
  register(req, res) {
    res.render("Register");
  }
  //[POST] /register
  apiregister(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var fullname = req.body.fullname;
    var adremail = req.body.adremail;
    var role = req.body.role;
    var department = req.body.department;

    AccountModel.findOne({
      username: username,
    })
      .then((data) => {
        if (data) {
          const message = "Account already exists!";
const url = '/user?' + querystring.stringify({message: message});
res.redirect(url);
        } else {
          AccountModel.findOne({
            adremail: adremail,
          })
            .then((data) => {
              if (data) {
                const message = "Account already exists!";
const url = '/user?' + querystring.stringify({message: message});
res.redirect(url);
              } else {
                bcrypt.hash(password, 10, function (err, hash) {
                  // Store hash in your password DB.
                  // console.log(hash)
                  AccountModel.create({
                    username: username,
                    password: hash,
                    fullname: fullname,
                    adremail: adremail,
                    role: role,
                    department: department,
                  });
                });
                return res.redirect("/user");
              }
            })
            .catch((err) => {
              console.error(err);
              res.json("Lỗi kiểm tra địa chỉ email");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.json("Lỗi kiểm tra tài khoản");
      });
  }
}

module.exports = new RegisterController();
