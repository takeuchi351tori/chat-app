// dbmodel.js
"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const User = sequelize.define("User", {
  /*
  db_id: {
    type: DataTypes.STRING,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  */
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authority: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = { User };
