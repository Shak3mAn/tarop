const express = require("express");
const TempUser = require("../model/tempUser");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// create tempUser
router.post("/create-temp-user", async (req, res, next) => {
  try {
    const { email } = req.body;

    const tempUser = await TempUser.findOne({ email });
    
    if (tempUser) {
        return next( new ErrorHandler("Temp User already exists!", 403))
    }

    const newTempUser = new TempUser(req.body);
    const savedTempUser = await newTempUser.save()

    res.status(201).json({ tempUser: savedTempUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get tempUser
router.get("/get-temp-user", async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return next(new ErrorHandler("Please provide a valid email", 400));
    }

    const tempUser = await TempUser.findOne({ email });

    res.status(200).json({
      success: true,
      tempUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get tempUsers
router.get("/get-temp-users", async (req, res, next) => {
  try {
    const tempUsers = await TempUser.find();

    res.status.apply(201).json({
      success: true,
      tempUsers,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update tempUser approved
router.patch("update-temp-user-approval/:id", async (req, res, next) => {
  try {
    const tempUserId = req.params.id;

    const updateTempUser = await TempUser.findByIdAndUpdate(
      tempUserId,
      {
        isApproved: req.body.isApproved,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      tempUser: updateTempUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update tempUser congratulation opened
router.patch("update-temp-user-congratulation/:id", async (req, res, next) => {
  try {
    const tempUserId = req.params.id;

    const updateTempUser = await TempUser.findByIdAndUpdate(
      tempUserId,
      {
        isCongratulationOpened: req.body.isCongratulationOpened,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      tempUser: updateTempUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// delete tempUser
router.delete("/delete-temp-user/:id", async (req, res, next) => {
  try {
    const tempUserId = req.params.id;

    const tempUser = await TempUser.findByIdAndDelete(tempUserId);

    if (!tempUser) {
      return next(new ErrorHandler("Temp User Not Found", 404));
    }

    res
      .status(200)
      .json({
        message: "Temp User deleted successfully",
        deletedUser: tempUser,
      });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = router;