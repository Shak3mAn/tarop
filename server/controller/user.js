const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

//TODO: Clear Unnecessary `clgs`

// create user
router.post("/create-user", async (req, res, next) => {
  try {
    const { email } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return next(new ErrorHandler("User already exists!", 403));
    }

    const newUser = new User(req.body);

    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get user
router.get("/get-user", async (req, res, next) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get Users
router.get("/get-users", async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update user info
router.put("/update-user/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(201).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user admin status
router.patch("/update-user-admin-status/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        isAdmin: req.body.isAdmin,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      user: updateUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update user approved
router.patch("/update-user-approval/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        isApproved: req.body.isApproved,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      user: updateUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update user congratulation opened
router.patch("/update-user-congratulation/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        isCongratulationOpened: req.body.isCongratulationOpened,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      user: updateUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// delete user
router.delete("/delete-user/:id", async (req, res, next) => {
  try {
    const userId = req.params.id; // Assuming you get the email from the request parameters

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser: user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
