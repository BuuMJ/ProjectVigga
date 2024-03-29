const IdeaModel = require("../app/models/Idea");
const multer = require("multer");
const fs = require("fs");

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
    const name = req.session.idSub
    if(name){
      // Lấy tên submission từ session
      var submissionName = req.session.idSub.name;
    // Tạo đường dẫn đầy đủ cho thư mục lưu trữ của submission đó
    var path = "uploads/" + submissionName + "/";
    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
    }else{
      // Tạo đường dẫn đầy đủ cho thư mục lưu trữ của avatar đó
    var path = "uploads/";
    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
    }
  },
  // Đặt tên file
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
 
var storage2 = multer.diskStorage({
  // Thư mục lưu trữ file
  destination: function (req, file, cb) {
    // Tạo đường dẫn đầy đủ cho thư mục lưu trữ của avatar đó
    var path = "uploads/avatar/";
    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  // Đặt tên file
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});



// Hàm filter
// const imageFilter = function (req, file, cb) {
//   // Chỉ chấp nhận file hình ảnh
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
//     return cb(new Error("Chỉ chấp nhận file hình ảnh"), false);
//   }
//   cb(null, true);
// };

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });
// var storage = multer.diskStorage({
//   // Thư mục lưu trữ file
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   // Đặt tên file
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

module.exports = { dataStatistics, upload, upload2 };
