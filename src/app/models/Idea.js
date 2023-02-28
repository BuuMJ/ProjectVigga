// Import các model từ các file riêng biệt
const mongoose = require('mongoose');
const AccountModel = require('../models/Account');
const Departmen = require('../models/Department');
const Submission = require('../models/Submission');
const Category = require('../models/Category');
// const IdeaModel = require('./models/idea');

// Định nghĩa schema cho bảng Idea, trong đó reference đến bảng Department và Account bằng ObjectId
const Idea = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  title: String,
  brief: String,
  content: String,
  file: String,
  
});

module.exports = mongoose.model("Idea", Idea);
