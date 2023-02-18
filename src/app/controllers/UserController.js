const path = require("path");
class UserController {

    create(req, res){
        res.render(path.join(__dirname ,"../../resources/views/user/createuser"))
    }
    
    index(req, res) {
        res.render("user");
    }

}


module.exports = new UserController;