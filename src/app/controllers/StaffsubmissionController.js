class StaffsubmissionController {

    // [GET] /community
    index(req, res) {
        res.render("staffsubmission", {user: req.user});
    }

}


module.exports = new StaffsubmissionController;