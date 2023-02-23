const AccountModel = require("../app/models/Account");
const jwt = require('jsonwebtoken')

//check login
function checkLogin(req, res, next){
    //check
    try{
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'PW')
        AccountModel.findOne({
            _id: idUser
        })
        .then(data=>{
            if(data){
                req.data = data
                return next()
            }else{
                res.render('login', {
                    title: 'not logged in',
                    msg: 'Please log in.'
                })
            }
        })
    }catch(err){
        return res.render('login', {
                    title: 'token error',
                    msg: 'Please log in again.'
               })
    }
}

//check Staff
function checkStaff(req, res, next){
    var role = req.data.role
    if( role === 'coordinator' || role === 'staff' || role === 'manager' || role === 'admin'){
        next()
    }else{
        return res.render('home', {
            title: 'authorized',
            msg: 'You are not authorized.'
       } )
    }
}

//check staff
function checkCoordinator(req, res, next){
    var role = req.data.role
    if(role === 'coordinator' || role === 'manager' || role === 'admin'){
        next()
    }else{
        return res.render('home', {
            title: 'authorized',
            msg: 'You are not authorized.'
       } )
    }
}

//check manager
function checkManager(req, res, next){
    var role = req.data.role
    if(role === 'manager' || role === 'admin'){
        next()
    }else{
        return res.render('home', {
            title: 'authorized',
            msg: 'You are not authorized.'
       } )
    }
}

//check admin
function checkAdmin(req, res, next){
    var role = req.data.role
    if(role === 'admin'){
        next()
    }else{
        return res.redirect('home', {
            title: 'authorized',
            msg: 'You are not authorized.'
       } )
    }
}


module.exports = {
    checkLogin,
    checkStaff,
    checkCoordinator,
    checkManager,
    checkAdmin
}