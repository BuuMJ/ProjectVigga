const path = require("path");
class UserController {


    
    index(req, res) {
        res.render("user", {user: req.user});
    }

}


module.exports = new UserController;