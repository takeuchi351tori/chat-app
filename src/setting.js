"use strict";

const { User } = require("../db/entity/user");
const { Group } = require("../db/entity/group");
const { addUser, updateAuthority } = require("../db/models/user");
const { createGroup } = require("../db/models/group");

async function set() {
  await User.sync({ force: true });
  await Group.sync({ force: true });
  const group1 = await createGroup("group1");
  await addUser("admin", "ee999999", "yx5Jvg", group1.id);
  await addUser("debugger", "ee000000", "debugger", group1.id);
  await updateAuthority("ee999999", 2);
  await addUser("guest", "ee111111", "guest", group1.id);
}

module.exports = { set };
