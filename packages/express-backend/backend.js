import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());  // Middleware to parse JSON bodies

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Helper function to find user by name
const findUserByName = (name) => users["users_list"].filter((user) => user["name"] === name);

// Helper function to find user by ID
const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

// Helper function to add a user
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

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
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

//delete
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
    res.send(result);
  }
});

//name and job filter
app.get("/users/search", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let result = users["users_list"];
  if (name !== undefined) {
    result = result.filter((user) => user["name"] === name);
  }
  if (job !== undefined) {
    result = result.filter((user) => user["job"] === job);
  }
  res.send({ users_list: result });
});

// Route to add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).send(); // Optionally, you can return the added user object or a success message
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
