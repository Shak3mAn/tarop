const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driver: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  email : {
    type: String,
    required: false,
  },
  vehicle: {
    type: String,
    required: false,
  },
  vehicleMake: {
    type: String,
    required: false,
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
});

module.exports = mongoose.model("Driver", driverSchema);
