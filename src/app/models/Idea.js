const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Idea = new Schema ({
    Title: String,
    Brief: String,
    Content: String,
    File: String,
    Category: String,
})

module.exports = mongoose.model('Idea', Idea);