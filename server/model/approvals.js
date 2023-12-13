const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const approvalsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      default: "Title",
    },
    action: {
      type: String,
      required: true,
      default: "Action",
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Approvals", approvalsSchema);
