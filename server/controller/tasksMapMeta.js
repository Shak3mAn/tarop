const express = require("express");
const TasksMapMeta = require("../model/tasksMapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create Tasks Map Meta
router.post("/create-task-map-meta", async (req, res, next) => {
  try {
    const newTaskMapMeta = new TasksMapMeta(req.body);
    const savedTaskMapMeta = await newTaskMapMeta.save();
    res.status(201).json({ savedTaskMapMeta });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get Task Map Meta
router.get("/get-task-map-meta/:id", async (req, res, next) => {
  try {
    const taskMapMeta = await TasksMapMeta.findById(req.params.id);

    if (!taskMapMeta) {
      return next(
        new ErrorHandler("There is no task map meta information", 400)
      );
    }

    res.status(200).json({
      success: true,
      taskMapMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-task-map-metas", async (req, res, next) => {
  try {
    const taskMapMetas = await TasksMapMeta.find();

    res.status(201).json({
      success: true,
      taskMapMetas,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Update Task Map Meta
router.put("/update-task-map-meta", async (req, res, next) => {
  try {
    const {taskId} = req.body;
    const updatedTaskMeta = await TasksMapMeta.findOneAndUpdate(
      taskId,
      req.body.updatedTaskMeta,
      { new: true }
    );
    if (!updatedTaskMeta) {
      return next(new ErrorHandler("Task Map Meta not found", 400));
    }
    res.status(200).json({
      success: true,
      taskMapMeta: updatedTaskMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

//Update Task Map Meta (partial update on teams Location)
router.patch('/update-task-meta-team-location', async (req, res, next) => {
    try {
      const { teamId } = req.body;
      const foundTaskMeta = await TasksMapMeta.find({ teamId });

    if (!foundTaskMeta || foundTaskMeta.length === 0) {
      return next(new ErrorHandler("Task Map Meta not found", 400));
    }
  
    const updateTaskMeta = await TasksMapMeta.updateMany(
        { teamId },
        { $set: { team: req.body.teamLocation } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        taskMapMeta: updateTaskMeta,
      })
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })

  //Update Task Map Meta (partial update on drivers Location)
router.patch('/update-task-meta-driver-location', async (req, res, next) => {
    try {
      const { teamId} = req.body;
      const foundTaskMeta = await TasksMapMeta.find({ teamId });

    if (!foundTaskMeta || foundTaskMeta.length === 0) {
      return next(new ErrorHandler("Task Map Meta not found", 400));
    }
  
    const updateTaskMeta = await TasksMapMeta.updateMany(
        { teamId },
        { $set: { driver: req.body.driverLocation } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        taskMapMeta: updateTaskMeta,
      })
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })


// Delete Task Map Meta
router.delete("/delete-task-map-meta/:id", async (req, res, next) => {
  try {
    const taskMapMetaId = req.params.id;
    const taskMeta = await TasksMapMeta.findByIdAndDelete(taskMapMetaId);

    if (!taskMeta) {
      return next(new ErrorHandler("No such task map meta entry exists!", 400));
    }

    res
      .status(200)
      .json({
        message: "Task map meta entry deleted successfully",
        deletedTaskMapMeta: taskMeta,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
