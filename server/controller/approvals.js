const express = require("express");
const Approvals = require("../model/approvals");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create approval
router.post("/create-approval", async (req, res, next) => {
  try {
    const newApproval = new Approvals(req.body);
    const savedApproval = await newApproval.save();
    res.status(201).json({ approval: savedApproval });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get Approvals
router.get("/get-approval/:id", async (req, res, next) => {
  try {
    const approval = await Approvals.findById(req.params.id);

    if (!approval) {
      return next(new ErrorHandler("Approvals doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      approval,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-approvals", async (req, res, next) => {
  try {
    const approvals = await Approvals.find();

    res.status(201).json({
      success: true,
      approvals,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// Delete Approvals
router.delete("/delete-approval/:id", async (req, res, next) => {
  try {
    const approvalId = req.params.id;

    const approval = await Approvals.findByIdAndDelete(approvalId);

    if (!approval) {
      return next(new ErrorHandler("No such approval exists!", 400));
    }

    res
      .status(200)
      .json({
        message: "Approvals deleted successfully",
        deletedApproval: approval,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.delete("/delete-approvals", async (req, res, next) => {
  try {
    const approvals = await Approvals.deleteMany();

    if (!approvals) {
      return next(new ErrorHandler("No approvals!", 400));
    }

    res
      .status(200)
      .json({
        message: "Approvals deleted successfully",
        deletedApprovals: approvals,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
