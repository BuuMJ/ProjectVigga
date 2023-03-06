const IdeaModel = require("../app/models/Idea");


function dataStatistics(req, res, next){
    IdeaModel.aggregate([
        {
          $group: {
            _id: "$department",
            count: { $sum: 1 },
          },
        },
      ]).exec((err, results) => {
        if (results) {
          req.department = results;
          return next();
        } else {
            console.log(err);
            res.status(500).send("Internal server error");
         
        }
      });
}

module.exports = {dataStatistics}