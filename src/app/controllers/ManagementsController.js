
class ManagementsController {
    
    category(req, res) {
        res.render("category");
    }
    submission(req, res) {
        res.render("submission");
    }
    department(req, res) {
        res.render("department");
    }

}



module.exports = new ManagementsController;