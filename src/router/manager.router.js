// manager.router.js
"use strict";

const express = require("express");
const manager = require("../controller/manager.controller");
const managerRouter = express.Router();

managerRouter.get("/", manager.displayMainPage);
managerRouter.get("/users", manager.displayUserList);
managerRouter.get("/invalidUsers", manager.displayInvalidUserList);
managerRouter.post("/users/:user_id/authority", manager.updateAuthority);
managerRouter.post("/users/:user_id/group/", manager.updateGroup);
managerRouter.get("/groups", manager.displayGroupList);
managerRouter.get("/invalidGroups", manager.displayInvalidGroupList);
managerRouter.post("/groups", manager.createGroup);
managerRouter.post("/group/:group_id/name", manager.renameGroup);
managerRouter.post("/group/:group_id/state", manager.changeGroupState);
managerRouter.get("/signup", manager.displaySignupPage);
managerRouter.post("/signup", manager.signup);

module.exports = managerRouter;
