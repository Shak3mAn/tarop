const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    team: {
      type: String,
      required: false,
      default: "Team",
    },
    teamColor: {
      type: String,
      required: false,
      default: "Team Color",
    },
    operationCoordinator: {
      type: String,
      required: true,
    },
    supportCoordinator: {
      type: String,
      required: false,
    },
    driverId: {
      type: String,
      required: false,
    },
    driver: {
      type: String,
      default: "Driver",
    },
    cachedLocation: {
      lat: {
        type: Number,
        required: false,
      },
      lng: {
        type: Number,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
    },
    setLocation: {
      lat: {
        type: Number,
        required: false,
      },
      lng: {
        type: Number,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
    },
    status: {
      type: String,
      default: "Initial",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
