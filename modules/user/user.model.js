const mongoose = require("mongoose");
// const config = require("config");
// const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    roles: [
      {
        type: String,
        $in: ["frontdesk"],
        default: "user"
      }
    ]
  },
  {
    collection: "user",
    timeStamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model("User", UserSchema);
