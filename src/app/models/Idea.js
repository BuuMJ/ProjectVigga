// Import các model từ các file riêng biệt
const mongoose = require("mongoose");
const AccountModel = require("../models/Account");
const Departmen = require("../models/Department");
const Submission = require("../models/Submission");
const Category = require("../models/Category");
const Schema = mongoose.Schema;
// Định nghĩa schema cho bảng Idea, trong đó reference đến bảng Department và Account bằng ObjectId
const Idea = new mongoose.Schema(
  {
    submission: String,
    adremail: String,
    department: String,
    title: String,
    brief: String,
    content: String,
    file: String,
    deadline_1: Date,
    deadline_2: Date,
    category: String,
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
    comment: [
      {
        annoymous: String,
        username: String,
        contentCM: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", Idea);
