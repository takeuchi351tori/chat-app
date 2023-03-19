// message.router.js
"use strict";

const express = require("express");
const generalRouter = require("./message/general.router");
const groupRouter = require("./message/group.router");
const pairRouter = require("./message/pair.router");
const messageRouter = express.Router();

messageRouter.use("/general", generalRouter);
messageRouter.use("/group", groupRouter);
messageRouter.use("/direct", pairRouter);

module.exports = messageRouter;
