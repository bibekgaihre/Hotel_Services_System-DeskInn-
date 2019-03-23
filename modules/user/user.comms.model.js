const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const CommsSchema = mongoose.Schema(
  {
    user_id: { type: ObjectId, required: true, ref: "User" },
    type: { type: String, required: true },
    address: { type: String, required: true },
    is_verified: { type: Boolean, default: false, required: true },
    is_primary: { type: Boolean, default: false, required: true },
    updated_by: { type: ObjectId, required: true, ref: "User" }
  },
  {
    collection: "user_comm",
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
module.exports = mongoose.model("User_Comm", CommsSchema);
