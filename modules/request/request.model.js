const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    room_no: {
      type: String,
      required: true
    },
    source: {
      type: String,
      $in: ["alexa", "phone", "tablet", "web", "messenger"]
    },
    requested_time: {
      type: Date,
      default: null
    },
    request_type: {
      type: String,
      enum: [
        "general",
        "food",
        "cleaning",
        "toiletries",
        "transport",
        "baggage",
        "spabook",
        "tablebook"
      ],
      required: true
    },
    assigned_to: {
      type: String
    },
    scheduled_time: {
      type: Date
    },
    status: {
      type: String,
      $in: ["new", "assigned", "cancelled", "completed"],
      required: true,
      default: "new"
    },
    note: {
      type: String,
      default: null
    },
    details: Object
  },
  {
    collection: "requests",
    timestamps: {
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
module.exports = mongoose.model("Request", RequestSchema);
