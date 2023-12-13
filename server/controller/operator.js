const express = require("express");
const Operator = require("../model/operator");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

//create operator
router.post("/create-operator", async (req, res, next) => {
  try {
    const { fullName } = req.body;

    const operatorName = await Operator.findOne({ fullName });

    if (operatorName) {
      return next(new ErrorHandler("Operator Coordinator already exists", 409));
    }

    const newOperator = new Operator(req.body);
    const savedOperator = await newOperator.save();

    res.status(201).json({ operator: savedOperator });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get operator
router.get("/get-operator/:id", async (req, res, next) => {
  try {
    const operator = await Operator.findById(req.params.id);

    if (!operator) {
      return next(new ErrorHandler("Operator doesn't exist", 404));
    }

    res.status(200).json({
      success: true,
      operator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.get("/get-operators", async (req, res, next) => {
  try {
    const operators = await Operator.find();

    res.status(201).json({
      success: true,
      operators,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

//update operator info
router.put("/update-operator/:id", async (req, res, next) => {
  try {
    const { fullName, firstName, lastName, phoneNo, email } = req.body;

    const updatedOperator = await Operator.findById(req.params.id);

    if (!updatedOperator) {
      throw new ErrorHandler("No support found", 404);
    }

    updatedOperator.fullName = fullName;
    updatedOperator.firstName = firstName;
    updatedOperator.lastName = lastName;
    updatedOperator.phoneNo = phoneNo;
    updatedOperator.email = email;

    await updatedOperator.save();

    res.status(201).json({
      success: true,
      operator: updatedOperator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update Operator (partial update for setLocation)
router.patch("/update-operator-location", async (req, res, next) => {
  try {
    const { email } = req.body;
    // console.log("The OPERATOR EMAIL:", email);
    // console.log("The phoneNo:", phoneNo)
    const updateOperator = await Operator.findOneAndUpdate(
      { email: email },
      { $set: { setLocation: req.body.setLocation } },
      { new: true }
    );

    if (!updateOperator) {
      return next(new ErrorHandler("Operator not found", 404));
    }

    res.status(201).json({
      success: true,
      operator: updateOperator,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// delete operator
router.delete("/delete-operator/:id", async (req, res, next) => {
  try {
    const operatorId = req.params.id;

    const operator = await Operator.findOneAndDelete(operatorId);

    if (!operator) {
      return next(new ErrorHandler("Operator not found", 404));
    }

    res.status(200).json({
      message: "Operator delete successfully",
      deletedOperator: operator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
