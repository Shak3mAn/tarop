const express = require("express");
const Team = require("../model/team");
const Driver = require("../model/driver");
const Task = require("../model/task");
const TeamsMapMeta = require("../model/teamsMapMeta");
const DriversMapMeta = require("../model/driversMapMeta");
const TasksMapMeta = require("../model/tasksMapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

//create team
router.post("/create-team", async (req, res, next) => {
  try {
    const { team, driverLocation } = req.body;

    const teamName = await Team.findOne({ team });

    if (teamName) {
      return next(new ErrorHandler("Team already exists", 400));
    }

    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();

    const newTeamMapMeta = new TeamsMapMeta({
      team: savedTeam.team,
      teamId: savedTeam._id,
      driverId: savedTeam.driverId,
      status: savedTeam.status,
      info: {
        operator: savedTeam.operationCoordinator,
        teamColor: savedTeam.teamColor,
        lat: savedTeam.cachedLocation.lat,
        lng: savedTeam.cachedLocation.lng,
        address: savedTeam.cachedLocation.address,
      },
      driver: {
        driver: driverLocation.driver,
        lat: driverLocation.lat,
        lng: driverLocation.lng,
      },
    });
    const savedTeamMapMeta = await newTeamMapMeta.save();

    const updateDriverMeta = await DriversMapMeta.findOneAndUpdate(
      { driverId: savedTeamMapMeta.driverId },
      {
        $set: {
          teamId: savedTeamMapMeta.teamId,
          "info.team": savedTeamMapMeta.team,
          "info.teamColor": savedTeamMapMeta.info.teamColor,
          status: savedTeamMapMeta.status,
          "team.team": savedTeamMapMeta.team,
          "team.lat": savedTeamMapMeta.info.lat,
          "team.lng": savedTeamMapMeta.info.lng,
        },
      },

      { new: true }
    );
    if (!updateDriverMeta) {
      return next(new ErrorHandler("Driver Map Meta doesn't exist", 404));
    }

    const updateDriver = await Driver.findByIdAndUpdate(
      savedTeamMapMeta.driverId,
      {
        $set: {
          team: savedTeamMapMeta.team,
          status: savedTeamMapMeta.status,
        },
      },
      { new: true }
    );

    res.status(201).json({
      saveT: savedTeam,
      saveTMM: savedTeamMapMeta,
      saveDMM: updateDriverMeta,
      saveDrv: updateDriver,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get team
router.get("/get-team/:id", async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return next(new ErrorHandler("Team doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-teams", async (req, res, next) => {
  try {
    const teams = await Team.find();

    res.status(201).json({
      success: true,
      teams,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//update team info
router.patch("/update-team/:id", async (req, res, next) => {
  try {
    const { driverLocation } = req.body;

    // console.log("This is Entire Body:", req.body);
    // console.log("This the Team:", team);

    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTeam) {
      throw new ErrorHandler("No team found", 404);
    }
    // console.log("This the updatedTeam:", updatedTeam);

    const updatedTeamMeta = await TeamsMapMeta.findOneAndUpdate(
      { teamId: req.params.id },
      {
        $set: {
          team: req.body.team,
          driverId: driverLocation.driverId,
          status: req.body.status,
          info: {
            operator: req.body.operationCoordinator,
            teamColor: req.body.teamColor,
            lat: req.body.setLocation.lat,
            lng: req.body.setLocation.lng,
            address: req.body.setLocation.address,
          },
          driver: {
            driver: driverLocation.driver,
            lat: driverLocation.lat,
            lng: driverLocation.lng,
          },
        },
      },
      { new: false }
    );
    if (!updatedTeamMeta) {
      return next(new ErrorHandler("Team Map Meta does not exist!", 404));
    }
    // console.log("This is UpdatedTeamMapMeta:", updatedTeamMeta);

    const updateDriverMeta = await DriversMapMeta.findOneAndUpdate(
      { driverId: updatedTeamMeta.driverId },
      {
        $set: {
          "info.team": req.body.team,
          "info.teamColor": req.body.teamColor,
          teamId: req.params.id,
          status: req.body.status,
          "team.team": req.body.team,
          "team.lat":  req.body.setLocation.lat,
          "team.lng": req.body.setLocation.lng,
        },
      },
    );
    if (!updateDriverMeta) {
      return next(new ErrorHandler("Driver Map Meta doesn't exist", 404));
    }
    // console.log("This is Entire UpdatedDriverMeta:", updateDriverMeta);

    const updateDriver = await Driver.findByIdAndUpdate(
      updatedTeamMeta.driverId,
      {
        $set: {
          team: req.body.team,
          status: req.body.status,
        },
      },
    );

    const updateTaskMeta = await TasksMapMeta.findOneAndUpdate(
      { teamId: updatedTeamMeta.teamId },
      {
        $set: {
          teamId: req.params.id,
          teamColor: req.body.teamColor,
          "team.team": req.body.team,
          "team.lat":  req.body.setLocation.lat,
          "team.lng":  req.body.setLocation.lng,
          status: req.body.status,
        },
      },
    );
    // if (!updateTaskMeta) {
    //   return next(new ErrorHandler("Task Map Meta doesn't exist", 404));
    // }
    // console.log("This is UpdateTaskMeta:", updateTaskMeta);


    const updateTask = await Task.findByIdAndUpdate(
      updateTaskMeta?.taskId,
      {
        $set: {
          team: req.body.team,
          status: req.body.status,
        },
      },
    );

    res.status(201).json({
      success: true,
      team: updatedTeam,
      driver: updateDriver,
      task: updateTask,
      teamMeta: updatedTeamMeta,
      driverMeta: updateDriverMeta,
      taskMeta: updateTaskMeta,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update Team (partial update for setLocation)
router.patch("/update-team-location", async (req, res, next) => {
  try {
    const { operationCoordinator } = req.body;
    // console.log("The Operator:", operationCoordinator)

    const updateTeam = await Team.findOneAndUpdate(
      { operationCoordinator: operationCoordinator },
      { $set: { setLocation: req.body.setLocation } },
      { new: true }
    );

    if (!updateTeam) {
      return next(new ErrorHandler("Team not found", 404));
    }

    // console.log("TheUpdated Team:", updateTeam)
    
    const updateTeamMetaLocation = await TeamsMapMeta.findOneAndUpdate(
      { teamId: updateTeam._id },
      {
        $set: {
          "info.lat": req.body.setLocation.lat,
          "info.lng": req.body.setLocation.lng,
        },
      },
      { new: true }
    );
    if (!updateTeamMetaLocation) {
      return next(new ErrorHandler("Team Map Meta does not exist!", 404));
    }
    // console.log("Th Updated TeamMeta:", updateTeamMetaLocation)

    // console.log("the driverId teams:", updateTeamMetaLocation.driverId)

    const updateDriverMetaLocation = await DriversMapMeta.findOneAndUpdate(
      { driverId: updateTeamMetaLocation.driverId },
      {
        $set: {
          "team.lat": req.body.setLocation.lat,
          "team.lng": req.body.setLocation.lng,
        },
      },
      { new: true }
    );
    if (!updateDriverMetaLocation) {
      return next(new ErrorHandler("Driver Map Meta doesn't exist", 404));
    }

    // console.log("TheUpdated Driver Meta:", updateDriverMetaLocation)


    const updateTaskMetaLocation = await TasksMapMeta.findOneAndUpdate(
      { teamId: updateTeamMetaLocation.teamId },
      {
        $set: {
          "team.lat": req.body.setLocation.lat,
          "team.lng": req.body.setLocation.lng,
        },
      },
      { new: true }
    );
    // if (!updateTaskMetaLocation) {
    //   return next(new ErrorHandler("Task Map Meta doesn't exist", 404));
    // }

    // console.log("TheUpdated TaskMeta:", updateTaskMetaLocation)


    res.status(201).json({
      success: true,
      teamL: updateTeam,
      teamML: updateTeamMetaLocation,
      driverML: updateDriverMetaLocation,
      taskML: updateTaskMetaLocation,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// delete Team
router.delete("/delete-team/:id", async (req, res, next) => {
  try {
    const teamId = req.params.id;

    const team = await Team.findByIdAndDelete(teamId);

    if (!team) {
      return next(new ErrorHandler("Team not found", 404));
    }

    const deleteTeamMeta = await TeamsMapMeta.findOneAndDelete(teamId);

    if (!deleteTeamMeta) {
      return next(new ErrorHandler("Team Map Meta entry does not exist!", 404));
    }

    res.status(200).json({
      message: "Team deleted successfully",
      deletedTeam: team,
      deleteTeamMeta: deleteTeamMeta,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
