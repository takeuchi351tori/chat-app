// groupMessage.js
"use strict";

const { sequelize } = require("../entity/db");
const { GroupMessage } = require("../entity/groupMessage");

async function addGroupMessage(message, user_id, group_id) {
  await GroupMessage.sync();
  const now = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
  const month = Number(now.getMonth()) + 1;
  const tr = await sequelize.transaction();
  try {
    const content = await GroupMessage.create(
      {
        message,
        date: now.getFullYear() + " " + month + "/" + now.getDate(),
        time: now.getHours() + ":" + now.getMinutes(),
        UserEmployeeId: user_id,
        GroupId: group_id,
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

async function findGroupMessage(id) {
  await GroupMessage.sync();
  const messages = await GroupMessage.findAll({ where: { GroupId: id } });
  return messages;
}

module.exports = { addGroupMessage, findGroupMessage };
