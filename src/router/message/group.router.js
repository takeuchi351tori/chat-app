// general.router.js
"use strict";

const express = require("express");
const group = require("../../controller/message/group.controller");
const groupRouter = express.Router();

groupRouter.get("/", group.find);
groupRouter.post("/", group.add);

module.exports = groupRouter;
