const express = require("express");
const TeamsMapMeta = require("../model/teamsMapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create Teams Map Meta
router.post("/create-team-map-meta", async (req, res, next) => {
  try {
    const { team } = req.body;

    const teamName = await TeamsMapMeta.findOne({ team });

    if (teamName) {
      return next(new ErrorHandler("Team already exists", 400));
    }
    const newTeamMapMeta = new TeamsMapMeta(req.body);
    const savedTeamMapMeta = await newTeamMapMeta.save();
    res.status(201).json({ savedTeamMapMeta });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Get Team Map Meta
router.get("/get-team-map-meta/:id", async (req, res, next) => {
  try {
    const teamMapMeta = await TeamsMapMeta.findById(req.params.id);

    if (!teamMapMeta) {
      return next(
        new ErrorHandler("There is no team map meta information", 400)
      );
    }

    res.status(200).json({
      success: true,
      teamMapMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-team-map-metas", async (req, res, next) => {
  try {
    const teamMapMetas = await TeamsMapMeta.find();

    res.status(201).json({
      success: true,
      teamMapMetas,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Update Team Map Meta
router.put("/update-team-map-meta", async (req, res, next) => {
  try {
    const { teamId } = req.body;
    const updatedTeamMeta = await TeamsMapMeta.findOneAndUpdate(
      teamId,
      req.body.updatedTeamMeta,
      { new: true }
    );
    if (!updatedTeamMeta) {
      return next(new ErrorHandler("Team Map Meta not found", 400));
    }
    res.status(200).json({
      success: true,
      teamMapMeta: updatedTeamMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Updated Team Map Meta (partial update on drivers Location)
router.patch("/update-team-meta-driver-location", async (req, res, next) => {
  try {
    const { teamId } = req.body;
    const foundTeamMeta = await TeamsMapMeta.find({ teamId });

    if (!foundTeamMeta || foundTeamMeta.length === 0) {
      return next(new ErrorHandler("Team Map Meta not found", 400));
    }

    const updateTeamMeta = await TeamsMapMeta.updateMany(
      { teamId },
      { $set: { driver: req.body.driverLocation } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      teamMapMeta: updateTeamMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Updated Team Map Meta (partial update on tasks Location)
router.patch("/update-team-meta-task-location", async (req, res, next) => {
  try {
    const { teamId } = req.body;
    const foundTeamMeta = await TeamsMapMeta.find({ teamId });

    if (!foundTeamMeta || foundTeamMeta.length === 0) {
      return next(new ErrorHandler("Team Map Meta not found", 400));
    }

    const updateTeamMeta = await TeamsMapMeta.updateMany(
      { teamId },
      { $set: { task: req.body.taskLocation } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      teamMapMeta: updateTeamMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// Delete Team Map Meta
router.delete("/delete-team-map-meta/:id", async (req, res, next) => {
  try {
    const teamMapMetaId = req.params.id;
    const teamMeta = await TeamsMapMeta.findByIdAndDelete(teamMapMetaId);

    if (!teamMeta) {
      return next(new ErrorHandler("No such team map meta entry exists!", 400));
    }

    res.status(200).json({
      message: "Team map meta entry deleted successfully",
      deletedTeamMapMeta: teamMeta,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
