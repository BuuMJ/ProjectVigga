
class AssigmentsController {

    createAssigments(req, res){
        res.render("../.././../resources/views/assigments/createAssigments")
    }
    
    index(req, res) {
        res.render("assigments");
    }

}


module.exports = new AssigmentsController;