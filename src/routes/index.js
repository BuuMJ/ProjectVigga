const communityRouter = require('./community')
const siteRouter = require('./site')
const userRouter = require('./user')
function route(app) {
    
     app.use('/user', userRouter)
      
     app.use('/community', communityRouter);
     
     app.use('/', siteRouter);
     

      
}

module.exports = route;