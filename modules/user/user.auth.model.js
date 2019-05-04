const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const AuthSchema = mongoose.Schema(
  {
    user_id: { type: ObjectId, required: true, ref: "User" },
    username: { type: String, required: true, unique: true },
    is_verified: { type: Boolean, required: true, default: false },
    type: { type: String, required: true },
    extras: Object,
    suspension: {
      is_suspended: { type: Boolean, default: false },
      reason: { type: String },
      suspended_date: { type: Date }
    },
    updated_by: { type: ObjectId, ref: "User" }
  },
  {
    collection: "user_auth",
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
module.exports = mongoose.model("User_Auth", AuthSchema);
