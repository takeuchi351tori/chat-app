// server.js
"use strict";
const app = require("./app");
const { set } = require("./setting");
const PORT = 3000;

app.listen(PORT, async () => {
  await set();
  console.log(`Listening on port ${PORT}`);
});
