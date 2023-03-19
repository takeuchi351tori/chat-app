// pair.controller.js
"use strict";

const { findAllUser, findUser } = require("../../../db/models/user");
const {
  findPairMessage,
  addPairMessage,
} = require("../../../db/models/pairMessage");

const pairMessage = {
  displayList: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    const users = await findAllUser();
    res.render("DMList", { users, ownId: req.session.userId });
  },
  displayMessage: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    const messageList = await findPairMessage(
      req.session.userId,
      req.params.id
    );
    const messages = [];
    for (const message of messageList) {
      const user = await findUser(message.send_user);
      messages.push({
        userName: user.name,
        message: message.message,
        date: message.date,
        time: message.time,
      });
    }
    const partner = await findUser(req.params.id);
    const selfUser = await findUser(req.session.userId);
    const users = [];
    users.push(partner);
    res.render("message", {
      messages,
      messageName: partner.name,
      path: "direct/" + req.params.id,
      ownId: selfUser.employee_id,
      ownName: selfUser.name,
      users,
    });
  },
  add: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    await addPairMessage(req.body.message, req.session.userId, req.params.id);
    res.redirect("/message/direct/" + req.params.id);
  },
};

module.exports = pairMessage;
