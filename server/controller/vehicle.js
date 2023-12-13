const express = require("express");
const Vehicle = require("../model/vehicle");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

//create vehicle
router.post("/create-vehicle", async (req, res, next) => {
  try {
    const { vehicle } = req.body;

    const vehicleReg = await Vehicle.findOne({ vehicle });

    if (vehicleReg) {
      return next(new ErrorHandler("Vehicle already exists", 409));
    }

    const newVehicle = new Vehicle(req.body);
    const savedVehicle = await newVehicle.save();

    res.status(201).json({ vehicle: savedVehicle });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get vehicle
router.get("/get-vehicle/:id", async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return next(new ErrorHandler("Vehicle doesn't exist", 404));
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-vehicles", async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();

    res.status(201).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

//update vehicle info
router.put("/update-vehicle/:id", async (req, res, next) => {
  try {
    const { vehicle, vehicleManufacturer, vehicleMake, vehicleColor } =
      req.body;

    const updatedVehicle = await Vehicle.findById(req.params.id);

    if (!updatedVehicle) {
      throw new ErrorHandler("No Vehicle found", 404);
    }

    updatedVehicle.vehicle = vehicle;
    updatedVehicle.vehicleManufacturer = vehicleManufacturer;
    updatedVehicle.vehicleMake = vehicleMake;
    updatedVehicle.vehicleColor = vehicleColor;

    await updatedVehicle.save();

    res.status(201).json({
      success: true,
      vehicle: updatedVehicle,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete vehicle
router.delete("/delete-vehicle/:id", async (req, res, next) => {
  try {
    const vehicleId = req.params.id;

    const vehicle = await Vehicle.findOneAndDelete(vehicleId);

    if (!vehicle) {
      return next(new ErrorHandler("Vehicle not found", 404));
    }

    res
      .status(200)
      .json({
        message: "Vehicle delete successfully",
        deletedVehicle: vehicle,
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
