class StaffsubmissionController {
  // [GET] /community
  index(req, res) {
    res.render("staffsubmission", {
      user: req.user,
      title: "Submission",
    });
  }
}

module.exports = new StaffsubmissionController();
