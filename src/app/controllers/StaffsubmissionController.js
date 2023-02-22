class StaffsubmissionController {

    // [GET] /community
    index(req, res) {
        res.render("staffsubmission");
    }

}


module.exports = new StaffsubmissionController;