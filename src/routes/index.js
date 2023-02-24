const staffsubmissionRouter = require("./staffsubmission");
const siteRouter = require("./site");
const userRouter = require("./user");
const registerRouter = require("./register");
const managementsRouter = require("./managements");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
} = require("../util/authonize");

function route(app) {
    
     app.use('/user',checkLogin,checkAdmin, userRouter)

     app.use('/managements', checkLogin, checkManager, managementsRouter)

     app.use('/register', registerRouter)
      
     app.use('/staffsubmission', checkLogin, staffsubmissionRouter);
     
     app.use('/', siteRouter);
     

  app.use("/staffsubmission", checkLogin, staffsubmissionRouter);

  app.use("/", siteRouter);
}

module.exports = route;
