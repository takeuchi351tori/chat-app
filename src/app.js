// app.js
"use strict";

const express = require("express");
const messageRouter = require("./router/message.router");
const userRouter = require("./router/user.router");
const mainRouter = require("./router/main.router");
const managerRouter = require("./router/manager.router");
const app = express();
const cookieSession = require("cookie-session");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use("/message", messageRouter);
app.use("/user", userRouter);
app.use("/", mainRouter);
app.use("/manager", managerRouter);

module.exports = app;
