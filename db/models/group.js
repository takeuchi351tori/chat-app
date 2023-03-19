// group.js
"use strict";

const { sequelize } = require("../entity/db");
const { Group } = require("../entity/group");

async function createGroup(name) {
  await Group.sync();
  const tr = await sequelize.transaction();
  try {
    const group = await Group.create(
      {
        name,
      },
      { transaction: tr }
    );
    await tr.commit();
    return group;
  } catch (error) {
    await tr.rollback();
    return false;
  }
}

async function findAllGroup() {
  await Group.sync();
  const groups = await Group.findAll({
    where: {
      state: 1,
    },
  });
  return groups;
}

async function findInvalidGroup() {
  await Group.sync();
  const groups = await Group.findAll({
    where: {
      state: 0,
    },
  });
  return groups;
}

async function findGroup(id) {
  await Group.sync();
  const group = await Group.findOne({ where: { id } });
  return group;
}

async function updateGroupState(id, level) {
  await Group.sync();
  await Group.update({ state: level }, { where: { id } });
}

async function updateGroupName(id, name) {
  await Group.sync();
  const tr = await sequelize.transaction();
  try {
    await Group.update({ name }, { where: { id } });
    await tr.commit();
    return;
  } catch (error) {
    await tr.rollback();
    return false;
  }
}

module.exports = {
  createGroup,
  findAllGroup,
  findInvalidGroup,
  findGroup,
  updateGroupState,
  updateGroupName,
};
