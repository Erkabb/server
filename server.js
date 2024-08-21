const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(express.json()); //bodygoos ywulsn JSON datag object bolgon ywulna(middleware)
// const users = [{ id: 1, name: "naraa", age: 20 }];
app.use(cors());
app.listen(8000, () => {
  console.log("server running at localhost:8000");
});

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);

  console.log("data", data);
  res.status(200).json({ users: obData.users });
});

app.post("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const adduser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(adduser);
  fs.writeFileSync("./users.json", JSON.stringify({ users }));
  res.status(200).json({ users: adduser });
});

app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIdx = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (findIdx > -1) {
    const deletedUser = users.splice(findIdx, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ users: deletedUser[0] });
  } else {
    res.status(400).json({ message: "not found" });
  }
});

app.put("/users/:userId", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  console.log(req.params);
  console.log(req.body);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );
  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ users: users[findIndex] });
  } else {
    res.status(400).json({ message: "not found" });
  }
});
