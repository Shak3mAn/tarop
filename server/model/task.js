const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    longDescription: {
      type: String,
    },
    team: {
      type: String,
      required: false,
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
    source: {
      sourceLat: {
        type: Number,
        required: false,
      },
      sourceLng: {
        type: Number,
        required: false,
      },
      sourceName: {
        type: String,
        required: false,
      },
      sourceLabel: {
        type: String,
        required: false,
      },
      sourceAddress: {
        type: String,
        required: false,
      },
      sourceCity: {
        type: String,
        required: false,
      },
      sourceState: {
        type: String,
        required: false,
      },
      sourceCountry: {
        type: String,
        required: false
      }
    },
    destination: {
      destinationLat: {
        type: Number,
        required: false,
      },
      destinationLng: {
        type: Number,
        required: false,
      },
      destinationName: {
        type: String,
        required: false,
      },
      destinationLabel: {
        type: String,
        required: false,
      },
      destinationAddress: {
        type: String,
        required: false,
      },
      destinationCity: {
        type: String,
        required: false,
      },
      destinationState: {
        type: String,
        required: false,
      },
      destinationCountry: {
        type: String,
        required: false
      }
    },
    duration: {
      type: String,
        required: false
    },
    distance: {
      type: String,
      required: false,
    },
    eta: {
      type: String,
      required: false
    },
    status: {
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

module.exports = mongoose.model("Task", taskSchema);
