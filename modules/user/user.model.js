const mongoose = require("mongoose");
const config = require("config");
const { ObjectId } = mongoose.Schema;

const UsersSchema = mongoose.Schema(
  {
    name: {
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      }
    },
    password: {
      hash: {
        type: String,
        required: true
      },
      salt: String
    },
    is_active: { type: Boolean, required: true, default: true },
    comms: [{ type: ObjectId, ref: "User_comm" }],
    roles: [
      {
        type: String,
        $in: ["frontdesk", "food_operator", "housekeeper", "bellman"],
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

module.exports = mongoose.model("User", UsersSchema);

UsersSchema.virtual("name.full").get(() => {
  return this.name.first_name + " " + this.name.last_name;
});

UsersSchema.virtual("email").get(() => {
  try {
    if (this.comms.length == 0) return null;

    let email = this.comms.find(e => {
      return e.type === "email" && e.is_primary;
    });
    if (email) return email.address;

    email = this.comms.find(e => {
      return e.type === "email";
    });
    if (email) return email.address;
  } catch (e) {
    return e;
  }
});
