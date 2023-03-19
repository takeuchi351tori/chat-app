// db.test.js
"use strict";

const { User } = require("./entity/user");
const { GeneralMessage } = require("./entity/generalMessage");
const { GroupMessage } = require("./entity/groupMessage");
const { Group } = require("./entity/group");
const {
  addUser,
  findAllUser,
  findUserPassword,
  findUser,
  getUserName,
  getAuthority,
  updateAuthority,
  updateGroup,
  findGroupUser,
  updateName,
  updatePassword,
} = require("./models/user");
const {
  addGeneralMessage,
  findGeneralMessage,
} = require("./models/generalMessage");
const { addGroupMessage, findGroupMessage } = require("./models/groupMessage");
const {
  createGroup,
  /* findAllGroup, */ findGroup,
  updateGroupState,
  updateGroupName,
} = require("./models/group");
const bcrypt = require("bcrypt");

const timeout = 50000;

describe("user", () => {
  it(
    "add user",
    async () => {
      expect.assertions(2);
      await User.sync({ force: true });
      await Group.sync({ force: true });
      const group = await createGroup("sample");
      await addUser("sample-user", "ee207032", "password", group.id);
      const users = await findAllUser();
      //    console.log(users);
      expect(users[0].name).toStrictEqual("sample-user");
      expect(users[0].employee_id).toStrictEqual("ee207032");
    },
    timeout
  );
  it(
    "password",
    async () => {
      expect.assertions(1);
      const pass = await findUserPassword("ee207032");
      const result = await bcrypt.compare("password", pass);
      expect(result).toStrictEqual(true);
    },
    timeout
  );
  it("update", async () => {
    User.sync();
    expect.assertions(3);
    const beforeUsers = await findAllUser();
    expect(beforeUsers[0].authority).toBe(1);
    await updateAuthority("ee207032", 2);
    const afterUsers = await findAllUser();
    expect(afterUsers[0].authority).toBe(2);
    const authority = await getAuthority("ee207032");
    expect(authority).toStrictEqual(2);
  });
  it("update setting", async () => {
    expect.assertions(2);
    await User.sync({ force: true });
    await Group.sync({ force: true });
    const sampleGroup = await createGroup("sample");
    await addUser("user", "ee000000", "pass", sampleGroup.id);
    await updateName("ee000000", "sampleUser");
    let updateUser = await findUser("ee000000");
    expect(updateUser.name).toStrictEqual("sampleUser");
    await updatePassword("ee000000", "password");
    updateUser = await findUser("ee000000");
    const result = await bcrypt.compare("password", updateUser.password);
    expect(result).toStrictEqual(true);
  });
});

describe("group", () => {
  it("create group", async () => {
    expect.assertions(1);
    await User.sync({ force: true });
    await Group.sync({ force: true });
    const sampleGroup = await createGroup("sample");
    /* const user = */ await addUser(
      "hoge",
      "ee123898",
      "pass",
      sampleGroup.id
    );
    //    console.log(user);
    const group = await findGroup(sampleGroup.id);
    //    console.log(group);
    expect(group.name).toStrictEqual("sample");
  });
  it("get group-user", async () => {
    expect.assertions(2);
    await Group.sync({ force: true });
    const group1 = await createGroup("sample1");
    const group2 = await createGroup("sample2");
    const user1 = await addUser("user1", "ee000001", "user1", group1.id);
    await updateGroup(user1.employee_id, group2.id);
    /* const user2 = */ await addUser("user2", "ee000002", "user2", group1.id);
    const user3 = await addUser("user3", "ee000003", "user3", group1.id);
    await updateGroup(user3.employee_id, group2.id);
    const groupUsers = await findGroupUser(group2.id);
    //    console.log(groupUsers);
    expect(groupUsers[0].name).toStrictEqual(user1.name);
    expect(groupUsers[1].name).toStrictEqual(user3.name);
  });
  it("group update", async () => {
    expect.assertions(2);
    await Group.sync({ force: true });
    const group = await createGroup("sample");
    await updateGroupName(group.id, "hoge");
    const updatedGroup1 = await findGroup(group.id);
    expect(updatedGroup1.name).toStrictEqual("hoge");
    await updateGroupState(group.id, 0);
    const updatedGroup2 = await findGroup(group.id);
    expect(updatedGroup2.state).toStrictEqual(0);
  });
});

describe("general message", () => {
  it(
    "add general message",
    async () => {
      expect.assertions(2);
      await User.sync({ force: true });
      await GeneralMessage.sync({ force: true });
      await Group.sync({ force: true });
      const group = await createGroup("sample");
      const user = await addUser("foo", "ee200000", "pass", group.id);
      await addGeneralMessage("sample", user.employee_id);
      await addGeneralMessage("hoge", user.employee_id);
      const list = await findGeneralMessage();
      expect(list[0].message).toStrictEqual("sample");
      //            console.log(list);
      //            console.log(list[0].UserEmployeeId);
      const name = await getUserName(list[0].UserEmployeeId);
      expect(name).toStrictEqual("foo");
      /*
      const users = await findAllUser();
      console.log(users);
      */
    },
    timeout
  );
});

describe("message", () => {
  it(
    "add message",
    async () => {
      expect.assertions(3);
      await GroupMessage.sync({ force: true });
      await GeneralMessage.sync({ force: true });
      await User.sync({ force: true });
      await Group.sync({ force: true });
      /*
      await GroupMessage.drop();
      await Group.drop();
      await User.drop();
      await GeneralMessage.drop();
      */
      const group1 = await createGroup("group1");
      //      console.log(group1);
      /* const user = */ await addUser("user", "ee000001", "pass", group1.id);
      //      console.log(user);
      /* const message1 = */ await addGroupMessage(
        "sample",
        "ee000001",
        group1.id
      );
      /* const message2 = */ await addGroupMessage(
        "hoge",
        "ee000001",
        group1.id
      );
      //      console.log(message1);
      //      console.log(message2);
      const list = await findGroupMessage(group1.id);
      //      console.log(list);
      expect(list[0].message).toStrictEqual("sample");
      expect(list[1].message).toStrictEqual("hoge");
      const name = await getUserName(list[0].UserEmployeeId);
      expect(name).toStrictEqual("user");
    },
    timeout
  );
});
