const connect = require("./configs/db");

const app = require("./index");

app.listen(1478, async () => {
  await connect();
  console.log("Hey There");
});
