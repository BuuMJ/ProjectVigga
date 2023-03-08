class StatisticsController {
  // [GET] /statistic
  statistic(req, res, next) {
    // console.log(req.department)
    res.render("statistics", {
      title: "Statistics",
      ideaCounts: req.department,
      user: req.user,
    });
  }
}

module.exports = new StatisticsController();
