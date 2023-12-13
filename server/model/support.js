const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
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
},
{ timestamps: true }
);

module.exports = mongoose.model("Support", supportSchema);