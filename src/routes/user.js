const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/connectionrequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "about"];
userRouter.get("/request", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    // console.log(loggedInUser)
    // res.send("haha")

    const allRequests = await Connection.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "all the datafecthed",
      data: allRequests,
    });

    // res.send(allRequests)
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    // console.log(loggedInUser)
    // res.send("haha")

    const allConnections = await Connection.find({
      $or: [
        {
          toUserId: loggedInUser,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const freshData = allConnections.map((data) => {
      if (data.fromUserId.equals(loggedInUser)) {
        return data.toUserId;
      } else {
        return data.fromUserId;
      }
    });

    res.json({
      message: "all the data fecthed",
      data: freshData,
    });

    // res.send(allConnections)
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //apne ko hatana hai
    //jo connection hai usko hatana h---accepted ,rejected
    //jo request bheje h usko hatana hai--->interested , ignore
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    const unecessaryUser = await Connection.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    // console.log(unecessaryUser)

    const hideUser = new Set();

    unecessaryUser.forEach((user) => {
      hideUser.add(user.fromUserId.toString());
      hideUser.add(user.toUserId.toString());
    });

    const reqUser = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUser) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(reqUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userRouter;
