const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AccountModel = require('../models/Account')

class SiteController {

    // [GET] /home
    home(req, res) {
        res.render("home");
    }
     // [GET] /login
    login(req, res) {
        res.render("login");
    }
    // [POST] /login
    apilogin(req, res, next){
        var username = req.body.username
        var password = req.body.password
      
      
        AccountModel.findOne({
            username: username,
        })
        .then(data=>{
          if(data){
            var token = jwt.sign({
              _id: data._id
            }, "PW")
            bcrypt.compare(password, data.password, function(err, result) {
              if(err){
                return res.render('login', {
                  title: 'login failled',
                  msg: 'Please log in again.'
                })
              }
              if(result){
                res.cookie('token', token, { expires: new Date(Date.now() + 900000)});
                return res.redirect("/");
                // return res.json({
                //   loginsuccessMsg: req.flash('dang nhap thanh cong'),
                // });
              }else{
                // return res.json('sai mật khẩu');
                return res.render('login', {
                  title: 'login failled',
                  msg: 'The user or password is incorrect.'
                })
              }
            });
          }else{
            // return res.json('sai tai khoan');
            return res.render('login', {
              title: 'login failled',
              msg: 'The user or password is incorrect.'
            })
          }
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json('loi sever')
        })

      }
}


module.exports = new SiteController;