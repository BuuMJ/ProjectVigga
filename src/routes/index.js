const staffsubmissionRouter = require('./staffsubmission')
const siteRouter = require('./site')
const userRouter = require('./user')
const registerRouter = require('./register')
const managementsRouter = require('./managements')
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin } = require('../ulti/authonize')


function route(app) {
    
     app.use('/user', checkLogin, userRouter)

     app.use('/managements', checkLogin, checkManager, managementsRouter)

     app.use('/register', checkLogin, registerRouter)
      
     app.use('/staffsubmission', checkLogin, staffsubmissionRouter);
     
     app.use('/', siteRouter);
     

      
}

module.exports = route;