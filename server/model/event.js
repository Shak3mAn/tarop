const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    instigator: {
        type: String,
        required: true,
        default: "Title",
      },
      operator: {
        operator: {
          type: String,
          required: false,
        },
        option: {
          type: Boolean,
          required: false,
        },
      },
      task: {
        task: {
          type: String,
          required: false,
        },
        option: {
          type: Boolean,
          required: false,
        },
      },
      driver: {
        driver: {
          type: String,
          required: false,
        },
        option: {
          type: Boolean,
          required: false,
        },
      },
    action: {
        type: String,
        required: false,
        default: "Action"
    },
    description: {
        type: String,
        required: false,
    },
    title: {
      type: String,
      require: false,
    },
    team: {
        type: String,
        required: false,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Event", eventSchema);