// group.js
"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");
const { User } = require("./user");

const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Group.hasMany(User);
User.belongsTo(Group);

module.exports = { Group };
