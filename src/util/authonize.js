const AccountModel = require("../app/models/Account");
const jwt = require("jsonwebtoken");
const { ConnectionStates } = require("mongoose");
const Department = require("../app/models/Department")

//check login
function checkLogin(req, res, next) {
  //check
  try {
    var token = req.cookies.token;
    var idUser = jwt.verify(token, "PW");
    AccountModel.findOne({
      _id: idUser,
    }).then((data) => {
      if (data) {
        req.user = data;
        // console.log(req.user)
        return next();
      } else {
        res.render("login", {
          title: "Login",
          msg: "Please login.",
        });
      }
    });
  } catch (err) {
    return res.render("login", {
      title: "Login",
      msg: "Please login.",
    });
  }
}

//check Staff
function checkStaff(req, res, next) {
  var role = req.user.role;
  if (
    role === "coordinator" ||
    role === "staff" ||
    role === "manager" ||
    role === "admin"
  ) {
    next();
  } else {
    return res.render("home", {
      title: "authorized",
      msg: "You are not authorized.",
    });
  }
}

//check Coordinator
function checkCoordinator(req, res, next) {
  var role = req.user.role;
  if (role === "coordinator" || role === "manager" || role === "admin") {
    next();
  } else {
    return res.render("home", {
      title: "authorized",
      msg: "You are not authorized.",
    });
  }
}

//check manager
function checkManager(req, res, next) {
  var role = req.user.role;
  if (role === "manager" || role === "admin") {
    next();
  } else {
    return res.render("home", {
      title: "authorized",
      msg: "You are not authorized.",
    });
  }
}

//check admin
function checkAdmin(req, res, next) {
  var role = req.user.role;
  if (role === "admin") {
    next();
  } else {
    return res.render("home", {
      title: "authorized",
      msg: "You are not authorized.",
    });
  }
}
// send data department
function dataDepartment(req, res, next) {
  const departments = req.query.departments;
  // Tìm dữ liệu trong database với Query String
  Department.find({})
    .then((department) => {
      department = department.map((department) => department.toObject());
      data = department;
      return next();
    })
    .catch(next);
}


module.exports = {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
  dataDepartment,
};
