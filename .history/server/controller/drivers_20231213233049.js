const express = require("express");
const Driver = require("../model/driver");
const Team = require("../model/team");
const Task = require("../model/task");
const DriversMapMeta = require("../model/driversMapMeta");
const TasksMapMeta = require("../model/tasksMapMeta");
const TeamsMapMeta = require("../model/teamsMapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create Driver
router.post("/create-driver", async (req, res, next) => {
  try {
    const { driver } = req.body;
    const driverName = await Driver.findOne({ driver });

    if (driverName) {
      return next(new ErrorHandler("Driver already exists", 409));
    }

    const newDriver = new Driver(req.body);
    const savedDriver = await newDriver.save();

    const newDriverMapMeta = new DriversMapMeta({
      driver: savedDriver.driver,
      driverId: savedDriver._id,
      email: savedDriver.email,
      vehicle: savedDriver.vehicle,
      vehicleMake: savedDriver.vehicleMake,
      status: savedDriver.status,
      info: {
        lat: savedDriver.cachedLocation.lat,
        lng: savedDriver.cachedLocation.lng,
        address: savedDriver.cachedLocation.address,
      },
    });
    const savedDriverMapMeta = await newDriverMapMeta.save();

    res
      .status(201)
      .json({ saveDrv: savedDriver, saveDrvMM: savedDriverMapMeta });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get Driver
router.get("/get-driver/:id", async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return next(new ErrorHandler("Driver doesn't exist", 404));
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get Driver by Phone No.
router.get("/get-driver-phone", async (req, res, next) => {
  try {
    const { phoneNo } = req.body;
    if (!phoneNo) {
      return next(new ErrorHandler("Please provide a valid Phone Number", 404));
    }
    const driver = await Driver.findOne({ phoneNo });

    if (!driver) {
      return next(new ErrorHandler("Phone Number doesn't exist!", 404));
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-drivers", async (req, res, next) => {
  try {
    const drivers = await Driver.find();

    res.status(201).json({
      success: true,
      drivers,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// Update Driver
router.patch("/update-driver/:id", async (req, res, next) => {
  try {
    const driverId = req.params.id;

    const updateDriver = await Driver.findByIdAndUpdate(driverId, req.body, {
      new: true,
    });
    if (!updateDriver) {
      return next(new ErrorHandler("Driver not found", 404));
    }

    const updateDriverMeta = await DriversMapMeta.findOneAndUpdate(
      { driverId },
      {
        $set: {
          driver: updateDriver.driver,
          email: updateDriver.email,
          vehicle: updateDriver.vehicle,
          vehicleMake: updateDriver.vehicleMake,
          status: updateDriver.status,
          "info.team": updateDriver.team,
          "info.lat": updateDriver.cachedLocation.lat,
          "info.lng": updateDriver.cachedLocation.lng,
          "info.address": updateDriver.cachedLocation.address,
        },
      },
      { new: true }
    );
    if (!updateDriverMeta) {
      return next(new ErrorHandler("DriveMapMeta does not exist!", 404));
    }

    const updateTeamMeta = await TeamsMapMeta.findOneAndUpdate(
      { driverId: updateDriverMeta.driverId },
      {
        $set: {
          driver: {
            driver: updateDriverMeta.driver,
            lat: updateDriverMeta.info.lat,
            lng: updateDriverMeta.info.lng,
          },
        },
      },
      { new: true }
    );
    // if (!updateTeamMeta) {
    //   return next(new ErrorHandler("TeamsMapMeta does not exist", 404));
    // }

    const updateTeam = await Team.findOneAndUpdate(
      { driverId: updateDriverMeta.driverId },
      {
        $set: {
          driver: updateDriverMeta.driver,
        },
      }
    );

    const updateTaskMeta = await TasksMapMeta.findOneAndUpdate(
      { teamId: updateTeamMeta?.teamId },
      {
        $set: {
          driver: {
            driver: updateDriverMeta.driver,
            lat: updateDriverMeta.info.lat,
            lng: updateDriverMeta.info.lng,
          },
        },
      },
      { new: true }
    );
    // if (!updateTaskMeta) {
    //   return next(new ErrorHandler("TasksMapMeta does not exist", 404));
    // }

    res.status(201).json({
      success: true,
      driver: updateDriver,
      team: updateTeam,
      driverMeta: updateDriverMeta,
      teamMeta: updateTeamMeta,
      taskMeta: updateTaskMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Update Driver (partial update for setLocation)
router.patch("/update-driver-location", async (req, res, next) => {
  try {
    const { email } = req.body;
    // console.log("This is the Driver", req.body)

    const updateDriver = await Driver.findOneAndUpdate(
      { email: email },
      { $set: { setLocation: req.body.setLocation } },
      { new: true }
    );
    if (!updateDriver) {
      return next(new ErrorHandler("Driver not found", 404));
    }

    const updateDriverMetaLocation = await DriversMapMeta.findOneAndUpdate(
      { driverId: updateDriver._id },
      {
        $set: {
          "info.lat": req.body.setLocation.lat,
          "info.lng": req.body.setLocation.lng,
        },
      },
      { new: true }
    );
    if (!updateDriverMetaLocation) {
      return next(new ErrorHandler("DriversMapMeta does not exist", 404));
    }

    const updateTeamMetaLocation = await TeamsMapMeta.findOneAndUpdate(
      { driverId: updateDriverMetaLocation.driverId },
      {
        $set: {
          "driver.lat": req.body.setLocation.lat,
          "driver.lng": req.body.setLocation.lng,
        },
      },
      { new: true }
    );
    // if (!updateTeamMetaLocation) {
    //   return next(new ErrorHandler("TeamsMapMeta does not exist", 404));
    // }

    const updateTaskMetaLocation = await TasksMapMeta.findOneAndUpdate(
      { teamId: updateTeamMetaLocation?.teamId },
      {
        $set: {
          "driver.lat": req.body.setLocation.lat,
          "driver.lng": req.body.setLocation.lng,
        },
      },
      { new: true }
    );
    // if (!updateTaskMetaLocation) {
    //   return next(new ErrorHandler("TasksMapMeta does not exist", 404));
    // }

    res.status(201).json({
      success: true,
      driverL: updateDriver,
      teamML: updateTeamMetaLocation,
      taskMl: updateTaskMetaLocation,
      driverML: updateDriverMetaLocation,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Delete Driver
router.delete("/delete-driver/:id", async (req, res, next) => {
  try {
    const driverId = req.params.id;

    const deleteDriver = await Driver.findByIdAndDelete(driverId);

    if (!deleteDriver) {
      return next(new ErrorHandler("No such driver exists!", 404));
    }

    // console.log("The deleted Driver Id:", driverId)

    const deleteDriverMeta = await DriversMapMeta.findOneAndDelete({
      driverId,
    });
    // console.log("The Deleted Driver:", deleteDriverMeta)

    if (!deleteDriverMeta) {
      return next(
        new ErrorHandler("Driver Map Meta Entry does not exist!", 404)
      );
    }

    res.status(200).json({
      message: "Driver deleted successfully",
      deletedDriver: deleteDriver,
      deleteDriverMeta: deleteDriverMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
