const express = require("express");
const Notification = require("../model/notification");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create notification
router.post("/create-notification", async (req, res, next) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json({ notification: savedNotification });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get Notification
router.get("/get-notification/:id", async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return next(new ErrorHandler("Notification doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-notifications", async (req, res, next) => {
  try {
    const notifications = await Notification.find();

    res.status(201).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Delete Notification
router.delete("/delete-notification/:id", async (req, res, next) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return next(new ErrorHandler("No such notification exists!", 400));
    }

    res
      .status(200)
      .json({
        message: "Notification deleted successfully",
        deletedNotification: notification,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.delete("/delete-notifications", async (req, res, next) => {
  try {
    const notifications = await Notification.deleteMany();

    if (!notifications) {
      return next(new ErrorHandler("No notifications!", 400));
    }

    res
      .status(200)
      .json({
        message: "Notifications deleted successfully",
        deletedNotifications: notifications,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
