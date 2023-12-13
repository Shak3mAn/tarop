const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicle: {
        type: String,
        required: true,
        default: "Vehicle"
    },
    vehicleManufacturer: {
        type: String,
        required: false,
        default: "Vehicle Manufacturer"
    },
    vehicleMake: {
        type: String,
        required: false,
    },
    vehicleColor: {
        type: String,
        required: false,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);