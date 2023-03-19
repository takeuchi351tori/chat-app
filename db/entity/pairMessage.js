// PairMessage.js
"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const PairMessage = sequelize.define("PairMessage", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  send_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receive_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { PairMessage };
