const mongoose = require('mongoose');

const adminTeamSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true,
        default: "Team"
    },
    teamColor: {
        type: String,
        required: true,
        default: "Team Color"
    },
    operationCoordinator: {
        type: String,
        required: true,
    },
    supportCoordinator: {
        type: String,
        required: true,
    },
    driver: {
        type: String,
        default: "user",
    },
    status: {
        type: String,
        default: "Initial",
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("AdminTeam", adminTeamSchema);