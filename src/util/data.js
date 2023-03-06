const IdeaModel = require("../app/models/Idea");
const multer = require("multer");

function dataStatistics(req, res, next) {
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

var storage = multer.diskStorage({
  // Thư mục lưu trữ file
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Đặt tên file
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { dataStatistics, upload };