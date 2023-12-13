const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: Number,
      required: false
    },
    role: {
      type: String,
      default: "User",
    },
    isUserSubmit: {
      type: Boolean,
      require: false,
    },
    isApproved: {
      type: Boolean,
      require: false,
    },
    isCongratulationOpened: {
      type: Boolean,
      require: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
