const bcrypt = require('bcrypt')
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
            return bcrypt.compare(password, data.password, function(err, result) {
              if(err){console.log(err)}
              if(result){
                return res.redirect("/")
                // return res.json('dang nhap thanh cong');
              }else{
                return res.render('login', {msg : 'The user or password is incorrect.'})
                // return res.json('dang nhap that bai');
              }
            });
          }else{
            // return res.json('sai tai khoan');
            return res.render('login', {msg : 'The user or password is incorrect.'})
          }
        })
      }
}


module.exports = new SiteController;