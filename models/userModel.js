const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: "Account 1"
    },
    bio: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    coverImage: {
      data: Buffer,
      contentType: String,
      required: false
    },
    profileImage: {
      data: Buffer,
      contentType: String,
      required: false
    },
    links: {
      twitter: {
        type: String,
        required: false
      },
      instagram: {
        type: String,
        required: false
      },
      site: {
        type: String,
        required: false
      }
    },
    address: {
      type: String,
      require: true,
      unique: true
    },
    balance: {
      type: String,
      default: -1,
      required: true
    }
  },
  { timestamps: true }
);
const USERS = mongoose.model("USERS", UsersSchema);
module.exports = USERS;
