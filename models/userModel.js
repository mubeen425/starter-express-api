const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    default:-1,
    required: true,
  },
});
const USERS = mongoose.model("USERS", UsersSchema);
module.exports = USERS;