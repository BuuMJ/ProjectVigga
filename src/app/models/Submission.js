const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Submission = new Schema ({
    name: String,
    deadline_1: String,
    deadline_2: String,
})

module.exports = mongoose.model('Submission' ,Submission );