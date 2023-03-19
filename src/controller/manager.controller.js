// manager.controller.js
"use strict";

const {
  findAllUserWithGroup,
  findInvalidUserWithGroup,
  updateAuthority,
  updateGroup,
  findGroupUser,
} = require("../../db/models/user");
const {
  createGroup,
  findAllGroup,
  findInvalidGroup,
  updateGroupState,
  updateGroupName,
} = require("../../db/models/group");
const { addUser } = require("../../db/models/user");

const manager = {
  displayMainPage: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    res.render("manager", {});
  },
  displayUserList: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    const users = await findAllUserWithGroup();
    const groups = await findAllGroup();
    res.render("userList", {
      users,
      groups,
      listName: "アクティブユーザ",
      listType: "active",
    });
  },
  displayInvalidUserList: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    const users = await findInvalidUserWithGroup();
    const groups = await findAllGroup();
    res.render("userList", {
      users,
      groups,
      listName: "削除済みユーザ",
      listType: "invalid",
    });
  },
  updateAuthority: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    await updateAuthority(req.params.user_id, req.body.auth);
    res.redirect("/manager/users");
  },
  updateGroup: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    await updateGroup(req.params.user_id, req.body.group_id);
    res.redirect("/manager/users");
  },
  displayGroupList: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    const groups = await findAllGroup();
    const groupList = [];
    for (const group of groups) {
      const usersList = await findGroupUser(group.id);
      groupList.push({
        name: group.name,
        id: group.id,
        state: group.state,
        users: usersList,
      });
    }
    res.render("groupList", {
      groupList,
      listName: "アクティブグループ",
      listType: "active",
    });
  },
  displayInvalidGroupList: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    const groups = await findInvalidGroup();
    const groupList = [];
    for (const group of groups) {
      const usersList = await findGroupUser(group.id);
      groupList.push({
        name: group.name,
        id: group.id,
        state: group.state,
        users: usersList,
      });
    }
    res.render("groupList", {
      groupList,
      listName: "削除済みグループ",
      listType: "invalid",
    });
  },

  createGroup: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    const groupName = req.body.groupName;
    await createGroup(groupName);
    res.redirect("/manager/groups");
  },
  renameGroup: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    await updateGroupName(req.params.group_id, req.body.updateName);
    res.redirect("/manager/groups");
  },
  changeGroupState: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    await updateGroupState(req.params.group_id, req.body.state);
    res.redirect("/manager/groups");
  },
  displaySignupPage: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    const groups = await findAllGroup();
    res.render("signup", { groups });
  },
  signup: async (req, res) => {
    if (req.session.authority !== 2) {
      res.redirect("/");
      return;
    }
    if (req.body.password !== req.body.rePassword) {
      res.redirect("/manager/signup");
      return;
    }

    const result = await addUser(
      req.body.name,
      req.body.employeeId,
      req.body.password,
      req.body.groupId
    );

    if (!result) {
      res.redirect("/manager/signup");
      return;
    }
    res.render("signupComplete");
  },
};

module.exports = manager;
