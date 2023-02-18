
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
            password: password
        })
        .then(data=>{
          if(data){
            return res.redirect("/")
          }else{
            res.render('login', {msg : 'dang nhap that bai'})
            // return res.json('dang nhap that bai');
          }
        })
      }
}


module.exports = new SiteController;