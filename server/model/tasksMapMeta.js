const mongoose = require("mongoose");

const taskMapMetaSchema = new mongoose.Schema({
  task: {
    type: String,
    required: false,
  },
  taskId: {
    type: String,
    require: false
  },
  teamId: {
    type: String,
    require: false
  },
  teamColor: {
    type: String,
    require: false,
  },
  source: {
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  destination: {
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  startDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  distance: {
    type: String,
    required: false,
  },
  eta: {
    type: String,
    required: false,
  },
  driver: {
    driver: {
      type: String,
      required: false,
    },
    lat: {
      type: Number,
      required: false,
      default: -1.2733
    },
    lng: {
      type: Number,
      required: false,
      default: 36.8057
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
      default: -1.2929
    },
    lng: {
      type: Number,
      required: false,
      default: 36.8305
    },
  },
});

module.exports = mongoose.model("TaskMapMeta", taskMapMetaSchema);
