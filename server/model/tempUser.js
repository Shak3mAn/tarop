const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: false,
  },
  isUserSubmit: {
    type: Boolean,
    require: false,
    default: false
  },
  isApproved: {
    type: Boolean,
    require: false,
  },
  isCongratulationOpened: {
    type: Boolean,
    require: false,
  },
});

module.exports = mongoose.model("TempUser", tempUserSchema);
