class StaticController {
  // [GET] /static
  index(req, res) {
    res.render("static", {
      user: req.user,
      title: "Static",
    });
  }
}

module.exports = new StaticController();
