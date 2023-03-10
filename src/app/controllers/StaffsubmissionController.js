const Submission = require("../models/Submission");
const { staffMongoseToObject } = require("../../util/mongoose");
const Idea = require("../models/Idea");
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const path = require("path");
const excelJs = require("exceljs");
const Admzip = require("adm-zip");

class StaffsubmissionController {
  // [GET] staffsubmission
  index(req, res, next) {
    Submission.find({})
      .then((submission) => {
        submission = submission.map((submission) => submission.toObject());
        res.render("staffsubmission", {
          submission,
          user: req.user,
          title: "submission",
        });
      })
      .catch(next);
  }
  // [GET] Show detail Submission
  show(req, res, next) {
    var idSub = req.params.id;
    Submission.findById(idSub)
      .then((submission) => {
        var submissionName = submission.name;

        Idea.find({ submission: submissionName }).then((ideas) => {
          req.session.idSub = submission;
          res.render("idea", {
            data: ideas.map((ideas) => ideas.toObject()),
            submission: staffMongoseToObject(submission),

            user: req.user,
            title: "Detail submission",
            idSub: req.session.idSub,
          });
        });
        // .catch(res.render("staffsubmission"));
      })
      .catch(next);
  }

  // [GET] create Idea
  createIdea(req, res, next) {
    // console.log(req.session.idSub);
    res.render("createIdea", {
      user: req.user,
      dataC,
      idSub: req.session.idSub,
      title: "Create Idea",
    });
  }

  // [POST] create Idea
  storeIdea(req, res, next) {
    var department = req.user.department;
    var adremail = req.user.adremail;
    var submission = req.session.idSub;
    // console.log(submission.name)
    const idea = new Idea({
      title: req.body.title,
      brief: req.body.brief,
      content: req.body.content,
      file: req.body.file,
      deadline_1: submission.deadline_1,
      deadline_2: submission.deadline_2,
      category: req.body.category,
      submission: submission.name,
      department: department,
      adremail: adremail,
    });
    //uploads file
    if (req.file) {
      // Kiểm tra xem có file được tải lên không
      fs.readFile(req.file.path, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          idea
            .save()
            .then(() => {
              res.redirect("/staffsubmission");
            })
            .catch(next);
        }
      });
    } else {
      idea
        .save()
        .then(() => {
          res.redirect("/staffsubmission");
        })
        .catch(next);
    }
  }

  // [POST] Like Idea
  async like(req, res, next) {
    try {
      const idea = await Idea.findById(req.params.id);
      data, idea.like++;
      await idea.save();
      // res.render("idea");
      res.redirect("/staffsubmission");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  // [POST] Dislike Idea
  async dislike(req, res, next) {
    try {
      const idea = await Idea.findById(req.params.id);
      idea.dislike++;
      await idea.save();
      res.redirect("/staffsubmission");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  // [GET] detail idea
  detail(req, res, next) {
    Idea.findById(req.params.id)
      .then((idea) =>
        res.render("detail", {
          idea: staffMongoseToObject(idea),
          user: req.user,
          title: "Detail",
        })
      )
      .catch(next);
  }
  // [POST] View Idea
  async view(req, res) {
    try {
      const idea = await Idea.findById(req.params.id);
      idea.view++;
      await idea.save();
      res.render("detail", {
        idea: staffMongoseToObject(idea),
        user: req.user,
        title: "Detail",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [POST] comment idea
  async comment(req, res) {
    // console.log(req.user.fullname);
    try {
      const idea = await Idea.findById(req.params.id);
      const username = req.user;
      // console.log(idea.adremail);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nxt03091999@gmail.com",
          pass: "magdbcqxrtndtach",
        },
      });
      var mailOptions = {
        to: idea.adremail,
        subject: "You have a new message",
        // text: req.user.fullname + ' commented on your post',
        text: req.body.content,
      };
      idea.comment.push({
        username: username.fullname,
        contentCM: req.body.content,
      });
      const comment = idea.comment;
      // console.log(comment.username);
      await idea.save();
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.render("detail", {
            idea: staffMongoseToObject(idea),
            comment,
            user: req.user,
            title: "Detail",
            data,
          });
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [GET] export Excel file idea
  async exportIdea(req, res, next) {
    var idSub = req.params.id;
    try {
      let workbook = new excelJs.Workbook();
      const worksheet = workbook.addWorksheet("idea");
      worksheet.columns = [
        { header: "ID", key: "id", width: 30 },
        { header: "Adremail", key: "adremail", width: 30 },
        { header: "Department", key: "department", width: 25 },
        { header: "Submission", key: "submission", width: 20 },
        { header: "Title", key: "title" },
        { header: "Brief", key: "brief" },
        { header: "Content", key: "content" },
        { header: "File", key: "file" },
        { header: "Category", key: "category" },
        { header: "Like", key: "like" },
        { header: "Dislike", key: "dislike" },
        { header: "View", key: "view" },
      ];

      const submission = await Submission.findById(idSub);
      const submissionN = submission.name;
      const ideaData = await Idea.find({ submission: submissionN });
      // console.log(ideaData + "aaaaaaaaa");
      ideaData.forEach((idea) => {
        worksheet.addRow(idea);
      });

      // const ideaData = await Idea.find({});
      // ideaData.forEach((idea) => {
      //   worksheet.addRow(idea);
      // });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment;filename-" + "idea.xlsx"
      );
      workbook.xlsx.write(res);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] export Zip file idea
  async exportZip(req, res, next) {
    var idSub = req.params.id;
    var zip = new Admzip();
    Submission.findById(idSub)
      .then((submission) => {
        var submissionName = submission.name;
        Idea.find({ submission: submissionName }).then((ideas) => {
          req.session.idSub = submission;
          zip.addLocalFolder("uploads/" + req.session.idSub.name);
          zip.writeZip("zip/files.zip");
          const dataZ = zip.toBuffer();
          res.set("Content-Type", "application/octet-stream");
          res.set("Content-Disposition", "attachment;filename-" + "Idea.zip");
          res.set("Content-Length", dataZ.length);
          res.send(dataZ);
        });
        // .catch(res.render("staffsubmission"));
      })
      .catch(next);
  }

  // zip.addLocalFolder("uploads/" + req.session.idSub.name);
  // zip.writeZip("zip/files.zip");
  // const dataZ = zip.toBuffer();
  // res.set("Content-Type", "application/octet-stream");
  // res.set("Content-Disposition", "attachment;filename-" + "Idea.zip");
  // res.set("Content-Length", dataZ.length);
  // res.send(dataZ);

  // async exportZip(req, res, next) {
  //   var zip = new Admzip();
  //   zip.addLocalFolder("uploads/");
  //   zip.writeZip("zip/files.zip");
  //   const dataZ = zip.toBuffer();
  //   res.set("Content-Type", "application/octet-stream");
  //   res.set("Content-Disposition", "attachment;filename-" + "idea.zip");
  //   res.set("Content-Length", dataZ.length);
  //   res.send(dataZ);
  // }
}

module.exports = new StaffsubmissionController();
