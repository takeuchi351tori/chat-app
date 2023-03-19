// GeneralMessage.js
"use strict";

const { sequelize } = require("../entity/db");
const { GeneralMessage } = require("../entity/generalMessage");

async function addGeneralMessage(message, id) {
  await GeneralMessage.sync();
  const now = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
  const month = Number(now.getMonth()) + 1;
  const tr = await sequelize.transaction();
  try {
    const content = await GeneralMessage.create(
      {
        message,
        date: now.getFullYear() + " " + month + "/" + now.getDate(),
        time: now.getHours() + ":" + now.getMinutes(),
        UserEmployeeId: id,
      },
      { transaction: tr }
    );
    await tr.commit();
    return content;
  } catch (error) {
    await tr.rollback();
    return false;
  }
}

async function findGeneralMessage() {
  await GeneralMessage.sync();
  const messages = await GeneralMessage.findAll();
  return messages;
}

module.exports = { addGeneralMessage, findGeneralMessage };
