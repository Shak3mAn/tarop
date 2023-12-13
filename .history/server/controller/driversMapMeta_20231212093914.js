const express = require("express");
const DriversMapMeta = require("../model/driversMapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create DriverMapMeta
router.post("/create-driver-map-meta", async (req, res, next) => {
  try {
    const newDriverMapMeta = new DriversMapMeta(req.body);
    const savedDriverMapMeta = await newDriverMapMeta.save();
    res.status(201).json({ savedDriverMapMeta });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get DriverMapMeta
router.get("/get-driver-map-meta", async (req, res, next) => {
  try {
    const { email } = req.query;
    console.log("Request DriverMapMeta email:", email)

    const driverMapMeta = await DriversMapMeta.findOne({ email});

    if (!driverMapMeta) {
      return next(
        new ErrorHandler("There is no driver map meta information", 400)
      );
    }

    res.status(200).json({
      success: true,
      driverMapMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-driver-map-metas", async (req, res, next) => {
  try {
    const driverMapMetas = await DriversMapMeta.find();

    res.status(201).json({
      success: true,
      driverMapMetas,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Update DriverMapMeta
router.put("/update-driver-map-meta", async (req, res, next) => {
  try {
    const { driverId } = req.body;
    const updatedDriverMeta = await DriversMapMeta.findOneAndUpdate(
      driverId,
      req.body.updatedDriverMeta,
      { new: true }
    );
    if (!updatedDriverMeta) {
      return next(new ErrorHandler("Driver Map Meta not found", 400));
    }
    res.status(200).json({
      success: true,
      driverMapMeta: updatedDriverMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Updated Driver Map Meta (partial update on team's Location)
router.patch("/update-driver-meta-team-location", async (req, res, next) => {
  try {
    const { teamId } = req.body;
    const foundDriverMeta = await DriversMapMeta.find({ teamId });

    if (!foundDriverMeta || foundDriverMeta.length === 0) {
      return next(new ErrorHandler("Driver Map Meta not found", 400));
    }

    const updateDriverMeta = await DriversMapMeta.updateMany(
      { teamId },
      { $set: { team: req.body.teamLocation } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      driverMapMeta: updateDriverMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Updated Driver Map Meta (partial update on task's Location)
router.patch("/update-driver-meta-task-location", async (req, res, next) => {
  try {
    const { teamId } = req.body;
    const foundDriverMeta = await DriversMapMeta.find({ teamId });

    if (!foundDriverMeta || foundDriverMeta.length === 0) {
      return next(new ErrorHandler("Driver Map Meta not found", 400));
    }

    const updateDriverMeta = await DriversMapMeta.updateMany(
      { teamId },
      { $set: { task: req.body.task } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      driverMapMeta: updateDriverMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Delete DriverMapMeta
router.delete("/delete-driver-map-meta/:id", async (req, res, next) => {
  try {
    const driverMapMetaId = req.params.id;
    const driverMeta = await DriversMapMeta.findByIdAndDelete(driverMapMetaId);

    if (!driverMeta) {
      return next(
        new ErrorHandler("No such driver map meta entry exists!", 400)
      );
    }

    res
      .status(200)
      .json({
        message: "Driver map meta entry deleted successfully",
        deletedDriverMapMeta: driverMeta,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
