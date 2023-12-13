const express = require("express");
const MapMeta = require("../model/mapMeta");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create mapMeta
router.post("/create-map-meta", async (req, res, next) => {
    try {
        const newMapMeta = new MapMeta(req.body);
        const savedMapMeta = await newMapMeta.save();
        res.status(201).json({ savedMapMeta });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});

// Get MapMeta
router.get("/get-map-meta/:id", async (req, res, next) => {
    try {
        const mapMeta = await MapMeta.findById(req.params.id);

        if (!mapMeta) {
            return next(new ErrorHandler("There is no map meta information", 400));
        }

        res.status(200).json({
            success: true,
            mapMeta,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});

router.get("/get-map-metas", async (req, res, next) => {
    try {
        const mapMetas = await MapMeta.find();

        res.status(201).json({
            success: true,
            mapMetas,
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
})

// Update MapMeta
router.put('/update-map-meta/:id', async (req, res, next) => {
    try {
        const mapMetaId = req.params.id;
        const updatedMapMeta = await MapMeta.findByIdAndUpdate(mapMetaId, req.body, { new: true });
        if (!updatedMapMeta) {
            return next(new ErrorHandler("MapMeta not found", 400));
        }
        res.status(200).json({
            success: true,
            mapMeta: updatedMapMeta,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});

// Delete MapMeta
router.delete("/delete-map-meta/:id", async (req, res, next) => {
    try {
        const mapMetaId = req.params.id;
        const mapMeta = await MapMeta.findByIdAndDelete(mapMetaId);

        if (!mapMeta) {
            return next(new ErrorHandler('No such MapMeta entry exists!', 400));
        }

        res.status(200).json({ message: "MapMeta entry deleted successfully", deletedMapMeta: mapMeta });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});

module.exports = router;
