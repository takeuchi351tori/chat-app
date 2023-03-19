// pair.test.js
"use strict";

const { User } = require("./entity/user");
const { Group } = require("./entity/group");
const { PairMessage } = require("./entity/pairMessage");
const { addUser } = require("./models/user");
const { createGroup } = require("./models/group");
const {
  addPairMessage,
  /* findAllPairMessage, */ findPairMessage,
} = require("./models/pairMessage");

describe("pair", () => {
  it("pairMessage", async () => {
    await User.sync({ force: true });
    await Group.sync({ force: true });
    await PairMessage.sync({ force: true });
    const group = await createGroup("group");
    const user1 = await addUser("user1", "ee000001", "pass", group.id);
    const user2 = await addUser("user2", "ee000002", "hoge", group.id);
    //    console.log(user1);
    //    console.log(user2);

    /*    const message1 = */ await addPairMessage(
      "reqest",
      user1.employee_id,
      user2.employee_id
    );
    /*    const message2 = */ await addPairMessage(
      "response",
      user2.employee_id,
      user1.employee_id
    );
    //    console.log(message);
    //    const messages = await findAllPairMessage();
    //    console.log(messages);
    const pairMessages = await findPairMessage(
      user1.employee_id,
      user2.employee_id
    );
    expect(pairMessages[0].send_user).toStrictEqual(user1.employee_id);
    expect(pairMessages[0].receive_user).toStrictEqual(user2.employee_id);
    console.log(pairMessages);
  });
});
