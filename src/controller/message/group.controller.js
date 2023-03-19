// group.controller.js
"use strict";

const { findGroupMessage } = require("../../../db/models/groupMessage");
const { addGroupMessage } = require("../../../db/models/groupMessage");
const { findUser, findGroupUser } = require("../../../db/models/user");
const { findGroup } = require("../../../db/models/group");

const groupMessage = {
  find: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    const user = await findUser(req.session.userId);
    const users = await findGroupUser(user.GroupId);
    const group = await findGroup(user.GroupId);
    const messageList = await findGroupMessage(group.id);
    const messages = [];
    for (const message of messageList) {
      const user = await findUser(message.UserEmployeeId);
      messages.push({
        userName: user.name,
        message: message.message,
        date: message.date,
        time: message.time,
      });
    }
    const selfUser = await findUser(req.session.userId);
    res.render("message", {
      messages,
      messageName: group.name,
      path: "group",
      users,
      ownId: selfUser.employee_id,
      ownName: selfUser.name,
    });
  },
  add: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    const user = await findUser(req.session.userId);
    await addGroupMessage(req.body.message, req.session.userId, user.GroupId);
    res.redirect("/message/group");
  },
};

module.exports = groupMessage;
