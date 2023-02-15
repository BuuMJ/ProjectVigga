const communityRouter = require('./community')
const siteRouter = require('./site')
function route(app) {
    

      
     app.use('/community', communityRouter);
     
     app.use('/', siteRouter);
     

      
}

module.exports = route;