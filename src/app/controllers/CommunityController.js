class CommunityController {

    // [GET] /community
    index(req, res) {
        res.render("community");
    }

}


module.exports = new CommunityController;