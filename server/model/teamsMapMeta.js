const mongoose = require("mongoose");

const teamsMapMetaSchema = new mongoose.Schema({
  team: {
    type: String,
    required: false,
  },
  teamId: {
    type: String,
    required: false,
  },
  driverId: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  info: {
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
    operator: {
      type: String,
      required: false,
    },
    teamColor: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  task: {
    task: {
      type: String,
      required: false,
    },
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
  },
  driver: {
    driver: {
      type: String,
      required: false,
    },
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
  },
});

module.exports = mongoose.model("TeamsMapMeta", teamsMapMetaSchema);
