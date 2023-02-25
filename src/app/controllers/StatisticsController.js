class StatisticsController {
  // [GET] /static
  index(req, res) {
    res.render("statistics", {
      user: req.user,
      title: "Statistics",
    });
  }
}

module.exports = new StatisticsController();
