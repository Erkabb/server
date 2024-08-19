const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.status(200).json({ name: "bat" });
});
app.listen(8000, () => {
  console.log("server running at localhost:8000");
});
app.post("/", (req, res) => {
  res.status(201).json({ name: "bat" });
});
app.delete("/", (req, res) => {
  res.status(400).json({ age: "19" });
});
