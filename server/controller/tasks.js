const express = require("express");
const Task = require("../model/task");
const Team = require("../model/team");
const Driver = require("../model/driver");
const TasksMapMeta = require("../model/tasksMapMeta");
const TeamsMapMeta = require("../model/teamsMapMeta");
const DriversMapMeta = require("../model/driversMapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create task
router.post("/create-task", async (req, res, next) => {
  try {
    const { name, teamLocation, driverLocation } = req.body;

    const taskName = await Task.findOne({ name });

    if (taskName) {
      return new ErrorHandler(res, 409, "Task already exists!");
    }

    const newTask = new Task(req.body);
    const savedTask = await newTask.save();

    const newTaskMapMeta = new TasksMapMeta({
      task: savedTask.name,
      taskId: savedTask._id,
      teamId: teamLocation.teamId,
      teamColor: teamLocation.teamColor,
      source: {
        lat: savedTask.source.sourceLat,
        lng: savedTask.source.sourceLng,
        label: savedTask.source.sourceLabel,
        address: savedTask.source.sourceAddress,
        city: savedTask.source.sourceCity,
        state: savedTask.source.sourceState,
        country: savedTask.source.sourceCountry,
      },
      destination: {
        lat: savedTask.destination.destinationLat,
        lng: savedTask.destination.destinationLng,
        label: savedTask.destination.destinationLabel,
        address: savedTask.destination.destinationAddress,
        city: savedTask.destination.destinationCity,
        state: savedTask.destination.destinationState,
        country: savedTask.destination.destinationCountry,
      },
      startDate: savedTask.startDate,
      startTime: savedTask.startTime,
      endTime: savedTask.endTime,
      duration: savedTask.duration,
      status: savedTask.status,
      distance: savedTask.distance,
      eta: savedTask.eta,
      driver: {
        driver: driverLocation.driver,
        lat: driverLocation.lat,
        lng: driverLocation.lng,
      },
      team: {
        team: teamLocation.team,
        lat: teamLocation.lat,
        lng: teamLocation.lng,
      },
    });
    const savedTaskMapMeta = await newTaskMapMeta.save();

    const updateTeamMapMeta = await TeamsMapMeta.findOneAndUpdate(
      { teamId: savedTaskMapMeta.teamId },
      {
        $set: {
          status: savedTaskMapMeta.status,
          task: {
            task: savedTaskMapMeta.task,
            lat: savedTaskMapMeta.destination.lat,
            lng: savedTaskMapMeta.destination.lng,
          },
        },
      },
      { new: false }
    );
    if (!updateTeamMapMeta) {
      return next(new ErrorHandler("Team Map Meta doesn't exist", 404));
    }

    const updateTeam = await Team.findByIdAndUpdate(
      updateTeamMapMeta.teamId,
      {
        $set: {
          status: savedTaskMapMeta.status,
        }
      },
      { new: true }
    )

    const updateDriveMapMeta = await DriversMapMeta.findOneAndUpdate(
      { teamId: savedTaskMapMeta.teamId},
      {
        $set: {
          status: savedTaskMapMeta.status,
          task: {
            task: savedTaskMapMeta.task,
            lat: savedTaskMapMeta.destination.lat,
            lng: savedTaskMapMeta.destination.lng,
          },
        },
      },
      { new: false }
    );
    if (!updateDriveMapMeta) {
      return next(new ErrorHandler("Driver Map Meta doesn't exist", 404));
    }

    const updateDriver = await Driver.findByIdAndUpdate(
      updateDriveMapMeta?.driverId,
      {
        $set: {
          status: savedTaskMapMeta.status,
        }
      },
      { new: false }
    )

    res
      .status(201)
      .json({
        saveTsk: savedTask,
        saveTm: updateTeam,
        saveDrv: updateDriver,
        saveTskMM: savedTaskMapMeta,
        saveDrvMM: updateDriveMapMeta,
        saveTmMM: updateTeamMapMeta,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get task
router.get("/get-task/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorHandler("Task doesn't exist", 404));
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find();

    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// Update task
router.patch("/update-task/:id", async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { teamLocation, driverLocation } = req.body;

    // console.log("Tasks req.body:", req.body)

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return next(new ErrorHandler("Task not found", 404));
    }

    const updateTaskMeta = await TasksMapMeta.findOneAndUpdate(
      { taskId },
      {
        $set: {
          task: updatedTask.name,
          teamId: teamLocation.teamId,
          teamColor: teamLocation.teamColor,
          source: {
            lat: updatedTask.source.sourceLat,
            lng: updatedTask.source.sourceLng,
            label: updatedTask.source.sourceLabel,
            address: updatedTask.source.sourceAddress,
            city: updatedTask.source.sourceCity,
            state: updatedTask.source.sourceState,
            country: updatedTask.source.sourceCountry,
          },
          destination: {
            lat: updatedTask.destination.destinationLat,
            lng: updatedTask.destination.destinationLng,
            label: updatedTask.destination.destinationLabel,
            address: updatedTask.destination.destinationAddress,
            city: updatedTask.destination.destinationCity,
            state: updatedTask.destination.destinationState,
            country: updatedTask.destination.destinationCountry,
          },
          startDate: updatedTask.startDate,
          startTime: updatedTask.startTime,
          endTime: updatedTask.endTime,
          duration: updatedTask.duration,
          status: updatedTask.status,
          distance: updatedTask.distance,
          eta: updatedTask.eta,
          driver: {
            driver: driverLocation.driver,
            lat: driverLocation.lat,
            lng: driverLocation.lng,
          },
          team: {
            team: teamLocation.team,
            lat: teamLocation.lat,
            lng: teamLocation.lng,
          },
        },
      },
      { new: true }
    );
    if (!updateTaskMeta) {
      return next(new ErrorHandler("TaskMapMeta does not exist!", 404));
    }

    const updateTeamMapMeta = await TeamsMapMeta.findOneAndUpdate(
      { teamId: updateTaskMeta.teamId },
      {
        $set: {
          status: req.body.status,
          task: {
            task: req.body.name,
            lat: req.body.destination.destinationLat,
            lng: req.body.destination.destinationLng,
          },
        },
      },
      { new: false }
    );
    if (!updateTeamMapMeta) {
      return next(new ErrorHandler("Team Map Meta doesn't exist", 404));
    }

    const updateTeam = await Team.findByIdAndUpdate(
      updateTeamMapMeta.teamId,
      {
        $set: {
          status: req.body.status,
        }
      },
      { new: false }
    )

    const updateDriveMapMeta = await DriversMapMeta.findOneAndUpdate(
      { teamId: updateTaskMeta.teamId},
      {
        $set: {
          status: req.body.status,
          task: {
            task: req.body.name,
            lat: req.body.destination.destinationLat,
            lng: req.body.destination.destinationLng,
          },
        },
      },
      { new: false }
    );
    if (!updateDriveMapMeta) {
      return next(new ErrorHandler("Driver Map Meta doesn't exist", 404));
    }
    // console.log("The UpdatedDriverMeta from Task: ", updateDriveMapMeta)

    const updateDriver = await Driver.findByIdAndUpdate(
      updateDriveMapMeta.driverId,
      {
        $set: {
          status: req.body.status,
        }
      },
      { new: false }
    )
    // console.log("The UpdatedDriver from Task: ", updateDriver)

    res.status(200).json({
      success: true,
      task: updatedTask,
      driver: updateDriver,
      team: updateTeam,
      taskMeta: updateTaskMeta,
      driverMeta: updateDriveMapMeta,
      teamMeta: updateTeamMapMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Delete task
router.delete("/delete-task/:id", async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return next(new ErrorHandler("No such task exists!", 400));
    }

    const deleteTaskMeta = await TasksMapMeta.findOneAndDelete(taskId);

    if (!deleteTaskMeta) {
      return next(new ErrorHandler("Task Map Meta Entry does not exist!", 404));
    }

    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask: task,
      deleteTaskMeta: deleteTaskMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
