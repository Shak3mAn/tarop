const mongoose = require("mongoose");

const driversMapMetaSchema = new mongoose.Schema({
  driver: {
    type: String,
    required: false,
  },
  driverId: {
    type: String,
    required: false,
  },
  email : {
    type: String,
    required: false,
  },
  teamId: {
    type: String,
    require: false,
  },
  vehicle: {
    type: String,
    required: false,
  },
  vehicleMake: {
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
    team: {
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
    }
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
  team: {
    team: {
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

module.exports = mongoose.model("DriversMapMeta", driversMapMetaSchema);
