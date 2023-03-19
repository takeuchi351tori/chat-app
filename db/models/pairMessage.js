// PairMessage.js
"use strict";

const { sequelize } = require("../entity/db");
const { PairMessage } = require("../entity/pairMessage");
const { Op } = require("sequelize");

async function addPairMessage(message, sendUserId, receiveUserId) {
  await PairMessage.sync();
  const now = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
  const month = Number(now.getMonth()) + 1;
  const tr = await sequelize.transaction();
  try {
    const content = await PairMessage.create(
      {
        message,
        date: now.getFullYear() + " " + month + "/" + now.getDate(),
        time: now.getHours() + ":" + now.getMinutes(),
        send_user: sendUserId,
        receive_user: receiveUserId,
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

async function findAllPairMessage() {
  await PairMessage.sync();
  const messages = await PairMessage.findAll();
  return messages;
}

async function findPairMessage(user1_id, user2_id) {
  await PairMessage.sync();
  const messages = await PairMessage.findAll({
    where: {
      [Op.or]: [
        { send_user: user1_id, receive_user: user2_id },
        { send_user: user2_id, receive_user: user1_id },
      ],
    },
  });
  return messages;
}

module.exports = { addPairMessage, findAllPairMessage, findPairMessage };
