import express from 'express';
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Route to get all users or by name/job
app.get("/users", (req, res) => {
  userServices.getUsers(req.query.name, req.query.job)
    .then(users => res.send({ users_list: users }))
    .catch(error => res.status(500).send(error.message));
});

// Route to get a user by ID
app.get("/users/:id", (req, res) => {
  userServices.findUserById(req.params.id)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch(error => res.status(500).send(error.message));
});

// Route to delete a user by ID
app.delete("/users/:id", (req, res) => {
  userServices.deleteUserById(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(error => res.status(500).send(error.message));
});

// Route to add a new user
app.post("/users", (req, res) => {
  userServices.addUser(req.body)
    .then(newUser => res.status(201).send(newUser))
    .catch(error => res.status(500).send(error.message));
});

// Root route to check if the server is running
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
