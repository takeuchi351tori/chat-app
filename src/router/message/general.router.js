// general.router.js
"use strict";

const express = require("express");
const general = require("../../controller/message/general.controller");
const generalRouter = express.Router();

generalRouter.get("/", general.find);
generalRouter.post("/", general.add);

module.exports = generalRouter;
