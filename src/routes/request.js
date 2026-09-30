const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const User = require("../models/user");
const Connection = require("../models/connectionrequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const isUserExist = await User.findById(toUserId);

      if (!isUserExist) {
        return res.status(400).json({
          message: "there doenot exist any user",
        });
      }

      const allowedStatus = ["interested", "ignore"];

      const isThere = allowedStatus.includes(status);

      if (!isThere) {
        return res
          .status(400)
          .json({ message: "Invalid Stataus type" + status });
      }

      //if there is an existing connection request

      const existingConnectionRequest = await Connection.findOne({
        $or: [
          { fromUserId, toUserId },
          // {fromUserId , toUserId:fromUserId},
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({ message: "Connection already exist" });
      }
      //if then connection is already sent to you

      const connectionReq = new Connection({
        fromUserId,
        toUserId,
        status,
      });

      const user = await connectionReq.save();

      res.json({
        message: "connectoion req send success",
        data: user,
      });
    } catch (err) {
      res.status(400).send("send " + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;

      const status = req.params.status;
      const toUserId = req.params.toUserId;

      const istoUserExist = await User.findById(toUserId);

      if (!istoUserExist) {
        return res.status(401).send("user doesnot existe");
      }

      const validStatus = ["accepted", "rejected"];

      if (!validStatus.includes(status)) {
        return res.status(401).send("invalid status");
      }

      const isValidreq = await Connection.findOne({
        fromUserId: toUserId,
        toUserId: loggedInUserId,
        status: "interested",
      });

      isValidreq.status = status;

      const connectionUpdate = await isValidreq.save();

      if (!connectionUpdate) {
        throw new Error("error in updating req");
      }

      res.status(200).send(`${status} the ${toUserId} request`);
    } catch (err) {
      res.status(400).send("review" + err.message);
    }
  },
);

module.exports = requestRouter;
