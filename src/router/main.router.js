// main.router.js
"use strict";

const express = require("express");
const main = require("../controller/main.controller");
const mainRouter = express.Router();

mainRouter.get("/", main.index);

module.exports = mainRouter;
