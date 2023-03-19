// user.js
"use strict";

const { sequelize } = require("../entity/db");
const { User } = require("../entity/user");
const { Group } = require("../entity/group");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

async function addUser(name, id, password, GroupId) {
  User.sync();
  if (!id.match(/^([a-z]{2})([0-9]{6})/)) {
    return false;
  }
  const tr = await sequelize.transaction();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create(
      {
        name,
        employee_id: id,
        password: hashedPassword,
        authority: 1,
        GroupId,
      },
      { transaction: tr }
    );
    await tr.commit();
    return user;
  } catch (error) {
    await tr.rollback();
    return false;
  }
}

// ユーザ全取得
async function findAllUser() {
  User.sync();
  const users = await User.findAll({
    where: {
      authority: {
        [Op.or]: [1, 2],
      },
    },
  });
  return users;
}

//get all users with group
async function findAllUserWithGroup() {
  User.sync();
  const users = await User.findAll({
    include: [Group],
    where: {
      authority: {
        [Op.or]: [1, 2],
      },
    },
  });
  return users;
}

// 削除済みユーザの取得
async function findInvalidUserWithGroup() {
  User.sync();
  const users = await User.findAll({
    include: [Group],
    where: {
      authority: 0,
    },
  });
  return users;
}

// 権限ユーザの数を取得
async function countManager() {
  User.sync();
  const managers = await User.findAll({
    where: {
      authority: 2,
    },
  });
  return managers.length;
}

// idからユーザを取得
async function findUser(id) {
  User.sync();
  const user = await User.findOne({ where: { employee_id: id } });
  return user;
}

// idに対応するパスワードの取得
async function findUserPassword(id) {
  User.sync();
  const user = await findUser(id);
  if (!user) {
    return false;
  } else if (user.authority === 0) {
    return false;
  }
  return user.password;
}

// idからユーザ名を取得
async function getUserName(id) {
  User.sync();
  const user = await findUser(id);
  return user.name;
}

// ユーザの権限情報の取得
async function getAuthority(id) {
  User.sync();
  const user = await findUser(id);
  return user.authority;
}

// ユーザの権限の変更 1:一般 2:マネージャー
async function updateAuthority(id, level) {
  User.sync();
  const target = await findUser(id);
  const count = await countManager();
  if (count === 1 && target.authority === 2) {
    return;
  }
  await User.update(
    { authority: level },
    {
      where: { employee_id: id },
    }
  );
}

// ユーザの所属グループの変更
async function updateGroup(user_id, group_id) {
  User.sync();
  await User.update(
    { GroupId: group_id },
    {
      where: { employee_id: user_id },
    }
  );
}

// グループに所属するユーザの取得
async function findGroupUser(group_id) {
  User.sync();
  const users = await User.findAll({
    where: {
      [Op.and]: [{ GroupId: group_id }, { authority: { [Op.or]: [1, 2] } }],
    },
  });
  return users;
}

// ユーザ名変更
async function updateName(id, name) {
  User.sync();
  const tr = await sequelize.transaction();
  try {
    await User.update({ name }, { where: { employee_id: id } });
    await tr.commit();
    return;
  } catch (error) {
    await tr.rollback();
    return false;
  }
}

// パスワード変更
async function updatePassword(id, password) {
  User.sync();
  const tr = await sequelize.transaction();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.update(
      { password: hashedPassword },
      { where: { employee_id: id } }
    );
    await tr.commit();
    return;
  } catch (error) {
    await tr.rollback();
    return false;
  }
}

module.exports = {
  addUser,
  findAllUser,
  findUser,
  findAllUserWithGroup,
  findInvalidUserWithGroup,
  findUserPassword,
  getUserName,
  getAuthority,
  updateAuthority,
  updateGroup,
  findGroupUser,
  updateName,
  updatePassword,
  countManager,
};
