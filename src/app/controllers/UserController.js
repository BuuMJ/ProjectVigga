const path = require("path");
const nodemailer = require("nodemailer");

class UserController {
  index(req, res) {
    res.render("user", { user: req.user });
  }

  async comment(req, res, next) {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nxt03091999@gmail.com",
        pass: "magdbcqxrtndtach",
      },
    });

    var mailOptions = {
      to: req.body.receiver,
      subject: "Sending Email using Node.js",
      text: req.body.comment,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = new UserController();
