// user.controller.js
"use strict";

const {
  findUser,
  findUserPassword,
  getAuthority,
  updateName,
  updatePassword,
} = require("../../db/models/user");
const bcrypt = require("bcrypt");

const user = {
  login: async (req, res) => {
    if (!req.body.employeeId) {
      console.log("incorrect");
    } else {
      const pass = await findUserPassword(req.body.employeeId);
      if (pass === false) {
        console.log("incorrect");
      } else if (await bcrypt.compare(req.body.password, pass)) {
        req.session.login = 1;
        // dbのgetAuthorityからユーザIDと権限取得
        req.session.userId = req.body.employeeId;
        req.session.authority = await getAuthority(req.body.employeeId);
      }
    }
    res.redirect("/");
  },
  logout: (req, res) => {
    req.session = null;
    res.redirect("/");
  },
  checkUser: async (req, res) => {
    res.render("signup", {});
  },
  displaySetting: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    const user = await findUser(req.session.userId);
    res.render("userSetting", { userName: user.name });
  },
  rename: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    await updateName(req.session.userId, req.body.rename);
    res.redirect("/user/setting");
  },
  resetPassword: async (req, res) => {
    if (req.session.login !== 1) {
      res.redirect("/");
      return;
    }
    const pass = await findUserPassword(req.session.userId);
    if (await bcrypt.compare(req.body.pass, pass)) {
      await updatePassword(req.session.userId, req.body.resetPass);
    }
    res.redirect("/user/setting");
  },
};

module.exports = user;
