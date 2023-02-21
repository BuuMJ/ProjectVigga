const communityRouter = require('./community')
const siteRouter = require('./site')
const userRouter = require('./user')
const registerRouter = require('./register')
const assigmentsRouter = require('./assigments')

function route(app) {
    
     app.use('/user', userRouter)

     app.use('/assigments', assigmentsRouter)

     app.use('/register', registerRouter)
      
     app.use('/community', communityRouter);
     
     app.use('/', siteRouter);
     

      
}

module.exports = route;