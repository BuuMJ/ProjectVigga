const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Account = new Schema(
  {
    username: String,
    password: String,
    fullname: String,
    adremail: String,
    role: String,
    department: String,
  },
  {
    collection: "accounts",
  }
);

const AccountModel = mongoose.model("accounts", Account);
module.exports = AccountModel;
