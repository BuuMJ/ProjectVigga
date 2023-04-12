const Idea = require('../models/Idea')

class StatisticsController {
  // [GET] /statistic
  async statistic(req, res, next) {
    // console.log(req.department)
    const count = await Idea.countDocuments({})
    res.render("statistics", {
      title: "Statistics",
      ideaCounts: req.department,
      user: req.user,
      count: count,
    });
  }
}

module.exports = new StatisticsController();
