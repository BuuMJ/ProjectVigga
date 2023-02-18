const bcrypt = require('bcrypt')
const AccountModel = require('../models/Account')

class RegisterController {

     // [GET] /register
     index(req, res) {
        res.render("Register");
    }
    //[POST] /register
    apiregister(req, res, next) {
        var username = req.body.username
        var password = req.body.password
        var fullname = req.body.fullname
        var adremail = req.body.adremail
        var role = req.body.role
      
      AccountModel.findOne({
        username: username,
      })
        .then(data => {
          if (data) {
            res.json('Tài khoản đã tồn tại');
          } else {
            AccountModel.findOne({
              adremail: adremail,
            })
              .then(data => {
                if (data) {
                  res.json('Địa chỉ email đã tồn tại');
                } else {
                  bcrypt.hash(password, 10, function(err, hash) {
                    // Store hash in your password DB.
                    console.log(hash)
                     AccountModel.create({
                      username: username,
                      password: hash,
                      fullname: fullname,
                      adremail: adremail,
                      role: role,
                    })
                })
              return res.render('login', {msg:'Dang ki thanh cong'})
                }
              })
              .catch(err => {
                console.error(err);
                res.json('Lỗi kiểm tra địa chỉ email');
              });
          }
        })
        .catch(err => {
          console.error(err);
          res.json('Lỗi kiểm tra tài khoản');
        });
        }
}


module.exports = new RegisterController;