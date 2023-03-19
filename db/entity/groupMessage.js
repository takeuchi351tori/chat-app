// groupMessage.js
"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");
const { User } = require("./user");
const { Group } = require("./group");

const GroupMessage = sequelize.define("Message", {
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

GroupMessage.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
GroupMessage.belongsTo(Group, {
  foreignKey: {
    allowNull: false,
  },
});
User.hasMany(GroupMessage);
Group.hasMany(GroupMessage);

module.exports = { GroupMessage };
