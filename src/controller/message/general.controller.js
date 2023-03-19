// general.controller.js
"use strict";

const { findGeneralMessage } = require("../../../db/models/generalMessage");
const { addGeneralMessage } = require("../../../db/models/generalMessage");
const { findAllUser, findUser } = require("../../../db/models/user");

const generalMessage = {
  find: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    const users = await findAllUser();
    const messageList = await findGeneralMessage();
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
      messageName: "全体チャット",
      path: "general",
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
    await addGeneralMessage(req.body.message, req.session.userId);
    res.redirect("/message/general");
  },
};

module.exports = generalMessage;
