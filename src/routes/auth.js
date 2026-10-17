const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authRouter = express.Router();
const {
  validateLoginData,
  validateSignUpData,
} = require("../utils/validation");

authRouter.post("/register", async (req, res) => {
  // validate the data
  // encrypt the password

  //creatting new instance of the user model
  // const user = new User({
  //     firstName:"vikrant nisu ",
  //     lastName:"chacha nisu",
  //     age:15,
  //     about:"this is vikrant singh"
  // })

  try {
    validateSignUpData(req);

    const { password, firstName, lastName, emailId, skills, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const newuser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await newuser.save();
    res.send("user daved to the database");
  } catch (err) {
    res.status(404).send("this i some error" + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req);

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("email/password not correct");
    }

    const isTrue = await user.comparePasword(password);

    if (!isTrue) {
      throw new Error("rmail/password not valids");
    }

    const token = await user.getJwt();
    // console.log(token);

    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.send(user);
  } catch (err) {
    res.status(400).send("there is error" + err);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("user loged out");
});

module.exports = authRouter;
