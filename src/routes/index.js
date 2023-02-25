const staffsubmissionRouter = require("./staffsubmission");
const siteRouter = require("./site");
const userRouter = require("./user");
const staticsRouter = require("./statics");
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
  app.use("/user", checkLogin, checkAdmin, userRouter);

  app.use("/managements", checkLogin, checkManager, managementsRouter);

  app.use("/register", checkLogin, checkAdmin, registerRouter);

  app.use("/statics", checkLogin, checkManager, staticsRouter);

  app.use("/staffsubmission", checkLogin, staffsubmissionRouter);

  app.use("/staffsubmission", checkLogin, staffsubmissionRouter);

  app.use("/", siteRouter);
}

module.exports = route;
