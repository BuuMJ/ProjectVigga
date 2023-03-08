const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Submission = new Schema({
  name: String,
  deadline_1: Date,
  deadline_2: Date,
});

module.exports = mongoose.model("Submission", Submission);
