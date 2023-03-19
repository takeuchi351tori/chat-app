// pair.router.js
"use strict";

const express = require("express");
const pair = require("../../controller/message/pair.controller");
const pairRouter = express.Router();

pairRouter.get("/", pair.displayList);
pairRouter.get("/:id", pair.displayMessage);
pairRouter.post("/:id", pair.add);

module.exports = pairRouter;
