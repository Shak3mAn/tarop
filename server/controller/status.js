const express = require("express");
const Task = require("../model/task");
const Team = require("../model/team");
const Driver = require("../model/driver");
const TasksMapMeta = require("../model/tasksMapMeta");
const TeamsMapMeta = require("../model/teamsMapMeta");
const DriversMapMeta = require("../model/driversMapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Update Status
router.patch("/update-status", async (req, res, next) => {
  try {
    const { status, taskId } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status: status } }
    );

    const updateTaskMeta = await TasksMapMeta.findOneAndUpdate(
      { taskId: updateTask._id },
      { $set: { status: status } }
    );
    
    const updateTeam = await Team.findByIdAndUpdate(updateTaskMeta.teamId, {
      $set: { status: status },
    });

    const updateTeamMeta = await TeamsMapMeta.findOneAndUpdate(
        { teamId: updateTeam._id },
        { $set: { status: status } }
    )

    const updateDriver = await Driver.findByIdAndUpdate(
        updateTeamMeta.driverId, {
            $set: { status: status },
        }
    )

    const updateDriverMeta = await DriversMapMeta.findOneAndUpdate(
        { driverId: updateDriver._id },
        { $set: { status: status } }
    )

    res.status(201).json({
        success: true,
        team: updateTeam,
        driver: updateDriver,
        task: updateTask,
        teamMeta: updateTeamMeta,
        driverMeta: updateDriverMeta,
        taskMeta: updateTaskMeta,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
