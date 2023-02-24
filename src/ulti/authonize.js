const AccountModel = require("../app/models/Account");
const jwt = require('jsonwebtoken');
const { ConnectionStates } = require("mongoose");

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
                req.user = data
                console.log(req.user)
                return next()
            }else{
                res.render('login', {
                    title: 'not logged in',
                    msg: 'Please login.'
                })
            }
        })
    }catch(err){
        return res.render('login', {
                    title: 'token error',
                    msg: 'Please login.'
               })
    }
}

//check Staff
function checkStaff(req, res, next){
    var role = req.user.role
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
    var role = req.user.role
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
    var role = req.user.role
    console.log(role)
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
    var role = req.user.role
    if(role === 'admin'){
        next()
    }else{
        return res.render('home', {
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