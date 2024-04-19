// backend.js
import express from "express";

const app = express(); // instance of express
const port = 8000;

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Helper functions
const findUserByName = (name) => users["users_list"].filter((user) => user["name"] === name);
const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

// Route to get all users or by name
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

// Route to get a user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id; // Access the ID provided in the URL
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
