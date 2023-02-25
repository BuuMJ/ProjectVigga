const staffsubmissionRouter = require("./staffsubmission");
const siteRouter = require("./site");
const userRouter = require("./user");
const statisticsRouter = require("./statistics");
const registerRouter = require("./register");
const managementsRouter = require("./managements");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
  dataDepartment,
} = require("../util/authonize");

function route(app) {
  app.use("/user", checkLogin, checkAdmin, dataDepartment, userRouter);

  app.use("/managements", checkLogin, checkManager, managementsRouter);

  app.use("/register", checkLogin, checkAdmin, registerRouter);

  app.use("/statistics", checkLogin, checkManager, statisticsRouter);

  app.use("/staffsubmission", checkLogin, staffsubmissionRouter);

  app.use("/staffsubmission", checkLogin, staffsubmissionRouter);

  app.use("/", siteRouter);
}

module.exports = route;
