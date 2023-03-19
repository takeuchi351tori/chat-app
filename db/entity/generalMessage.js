// generalMessage.js
"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");
const { User } = require("./user");

const GeneralMessage = sequelize.define("GeneralMessage", {
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
});

User.hasMany(GeneralMessage);
GeneralMessage.belongsTo(User);

module.exports = { GeneralMessage };
