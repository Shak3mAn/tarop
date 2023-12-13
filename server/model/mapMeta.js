const mongoose = require("mongoose");

const mapMetaSchema = new mongoose.Schema({
  origin: {
    origin: {
      type: String,
      required: false,
    },
    sourceAddress: {
      type: String,
      required: false,
    },
    sourceLabel: {
      type: String,
      required: false,
    },
    sourceLat: {
      type: Number,
      required: false,
    },
    sourceLng: {
      type: Number,
      required: false,
    },
  },
  destination: {
    destination: {
      type: String,
      required: false,
    },
    destinationAddress: {
      type: String,
      required: false,
    },
    destinationLabel: {
      type: String,
      required: false,
      defaultValue: "label",
    },
    destinationLat: {
      type: Number,
      required: false,
    },
    destinationLng: {
      type: Number,
      required: false,
    },
  },
  duration: {
    type: String,
  },
  distance: {
    type: String,
    required: false,
  },
  eta: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("MapMeta", mapMetaSchema);
