const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const User = require("../models/user");
const {
  validateEditProfileData,
  validateEnterPass,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

profileRouter.get("/connectionreq", userAuth, (req, res) => {
  console.log(req.user);

  const { firstName, lastName } = req.user;

  res.send(firstName + " " + lastName + " " + "sent you the connection resq");
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);

    const isAllowed = [
      "firstName",
      "lastName",
      "age",
      "about",
      "skills",
      "gender",
    ];

    const data = req.body;

    const isTrue = Object.keys(data).every((k) => {
      return isAllowed.includes(k);
    });
    if (!isTrue) {
      throw new Error("fields cant be edit");
    }

    const loggedInuser = req.user;
    const newDatauser = req.body;

    Object.keys(newDatauser).forEach((fields) => {
      loggedInuser[fields] = newDatauser[fields];
    });

    await loggedInuser.save();

    res.send("field changes successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/password/edit", userAuth, async (req, res) => {
  try {
    await validateEnterPass(req);

    const { enterOriginalPassword, enterNewPassword } = req.body;

    const newPasswordHash = await bcrypt.hash(enterNewPassword, 10);

    const user = req.user;

    user.password = newPasswordHash;

    user.save();
    res.json({
      message: "Password updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = profileRouter;
