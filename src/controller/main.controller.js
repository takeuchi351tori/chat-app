// main.controller.js
"use strict";

const main = {
  index: (req, res) => {
    if (req.session.login === 1) {
      res.render("home");
    } else {
      res.redirect("/login.html");
    }
  },
};

module.exports = main;
