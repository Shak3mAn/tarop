const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        default: "Name"
    },
    firstName: {
        type: String,
        required: false,
        default: "First"
    },
    lastName: {
        type: String,
        required: false
    },
    phoneNo: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        default: "email",
    },
    team: {
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
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Operator", operatorSchema);