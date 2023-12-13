const express = require("express");
const Event = require("../model/event");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create event
router.post("/create-event", async (req, res, next) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json({ event: savedEvent });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get Event
router.get("/get-event/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new ErrorHandler("Event doesn't exist", 404));
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-events", async (req, res, next) => {
  try {
    const events = await Event.find();

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// Delete Event
router.delete("/delete-event/:id", async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const deleteEvent = await Event.findByIdAndDelete(eventId);

    if (!deleteEvent) {
      return next(new ErrorHandler("No such event exists!", 404));
    }

    res.status(200).json({
      message: "Event deleted successfully",
      deletedEvent: deleteEvent,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.delete("/delete-events", async (req, res, next) => {
  try {
    const events = await Event.deleteMany();

    if (!events) {
      return next(new ErrorHandler("No events!", 404));
    }

    res
      .status(200)
      .json({ message: "Events deleted successfully", deletedEvents: events });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
