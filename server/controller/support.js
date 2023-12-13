const express = require("express");
const Support = require("../model/support");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

//create support
router.post("/create-support", async (req, res, next) => {
  try {
    const { fullName } = req.body;

    const supportName = await Support.findOne({ fullName });

    if (supportName) {
      return next(new ErrorHandler("Support Coordinator already exists", 409));
    }

    const newSupport = new Support(req.body);
    const savedSupport = await newSupport.save();

    res.status(201).json({ support: savedSupport });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get support
router.get("/get-support/:id", async (req, res, next) => {
  try {
    const support = await Support.findById(req.params.id);

    if (!support) {
      return next(new ErrorHandler("Support doesn't exist", 404));
    }

    res.status(200).json({
      success: true,
      support,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-supports", async (req, res, next) => {
  try {
    const supports = await Support.find();

    res.status(201).json({
      success: true,
      supports,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

//update support info
router.put("/update-support/:id", async (req, res, next) => {
  try {
    const { fullName, firstName, lastName, phoneNo, email } = req.body;

    const updatedSupport = await Support.findById(req.params.id);

    if (!updatedSupport) {
      throw new ErrorHandler("No support found", 404);
    }

    updatedSupport.fullName = fullName;
    updatedSupport.firstName = firstName;
    updatedSupport.lastName = lastName;
    updatedSupport.phoneNo = phoneNo;
    updatedSupport.email = email;

    await updatedSupport.save();

    res.status(201).json({
      success: true,
      support: updatedSupport,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete support
router.delete("/delete-support/:id", async (req, res, next) => {
  try {
    const supportId = req.params.id;

    const support = await Support.findOneAndDelete(supportId);

    if (!support) {
      return next(new ErrorHandler("Support not found", 404));
    }

    res
      .status(200)
      .json({
        message: "Support delete successfully",
        deletedSupport: support,
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
