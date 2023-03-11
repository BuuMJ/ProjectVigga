const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Idea",
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  action: {
    type: String,
    enum: ["like", "dislike"],
    required: true,
  },
});

module.exports = mongoose.model("Action", actionSchema);