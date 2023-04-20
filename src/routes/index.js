const staffsubmissionRouter = require("./staffsubmission");
const siteRouter = require("./site");
const userRouter = require("./user");
const statisticsRouter = require("./statistics");
const registerRouter = require("./register");
const managementsRouter = require("./managements");
const { dataStatistics } = require("../util/data");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
  dataDepartment,
  dataIdea,
  dataCategory,
} = require("../util/authonize");

function route(app) {
  app.use("/user", checkLogin, dataDepartment, userRouter);

  app.use("/managements", checkLogin, checkManager, managementsRouter);

  app.use("/register", checkLogin, checkAdmin, registerRouter);

  app.use("/statistics", checkLogin, checkCoordinator, statisticsRouter);

  app.use(
    "/staffsubmission",
    checkLogin,
    dataIdea,
    dataCategory,
    staffsubmissionRouter
  );

  app.use("/", siteRouter);
}

module.exports = route;
