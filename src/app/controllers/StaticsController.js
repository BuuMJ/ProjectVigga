class StaticsController {
  // [GET] /static
  index(req, res) {
    res.render("statics", {
      user: req.user,
      title: "Statics",
    });
  }
}

module.exports = new StaticsController();
