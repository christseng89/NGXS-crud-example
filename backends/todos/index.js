const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

let ebCIPHost = "localhost";
let urlPath = "/todos";
if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
  ebCIPHost = process.env.ebCIPHost;
  urlPath = "/todos/create";
}
console.log(ebCIPHost);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const todos = [
  { id: 5001, title: "Buy milk", userId: "123", completed: false },
  { id: 5002, title: "Take computer lessons", userId: "123", completed: false },
  { id: 5003, title: "Goto school", userId: "123", completed: false },
  { id: 5004, title: "Interview Teresa", userId: "123", completed: false },
];

app.get(`${urlPath}/:id`, async (req, res) => {
  const idx = todos.findIndex((i) => i.id.toString() === req.params.id);
  if (idx > -1) {
    res.send(todos[idx]);
  } else {
    res.status(400).send({ error: `Todo '${req.params.id}' not found` });
  }
});

app.get(urlPath, async (_req, res) => {
  res.send(todos);
});

app.post(urlPath, async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { userId, title } = req.body;
  if (userId && title) {
    const todo = { id, userId, title, completed: false };
    todos.push(todo);
    res.status(201).send(todo);
  } else {
    res.status(400).send({ error: "Missing userId or title" });
  }
});

app.put(`${urlPath}/:id`, async (req, res) => {
  const idx = todos.findIndex((i) => i.id.toString() === req.params.id);
  if (idx > -1) {
    const { userId, title } = req.body;
    if (userId && title) {
      todos[idx] = { ...todos[idx], userId, title };
      res.send(todos[idx]);
    } else {
      res.status(400).send({ error: "Missing userId or title or completed" });
    }
  } else {
    res.status(400).send({ error: `Todo '${req.params.id}' not found` });
  }
});

app.delete(`${urlPath}/:id`, async (req, res) => {
  const idx = todos.findIndex((i) => i.id.toString() === req.params.id);
  if (idx > -1) {
    todos.splice(idx, 1);
    res.send({ success: `Todo '${req.params.id}' deleted` });
  } else {
    res.status(400).send({ error: `Todo '${req.params.id}' not found` });
  }
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
