// user.router.js
"use strict";

const express = require("express");
const user = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/login", user.login);
userRouter.post("/logout", user.logout);
userRouter.get("/signup", user.checkUser);
userRouter.get("/setting", user.displaySetting);
userRouter.post("/setting/name", user.rename);
userRouter.post("/setting/password", user.resetPassword);

module.exports = userRouter;
