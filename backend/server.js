const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const {
  getDataFromDatabase,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./logic/todoLogic");

const {
  getUserFromDatabase,
} = require("./logic/userLogic");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.URI ?? "";
const port = process.env.PORT;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(async () => {
  try {
    await mongoose.connect(uri, mongooseOptions);
    console.log("Connected to MongoDB");

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const usersCollection = mongoose.connection.collection("users");
    const user = await usersCollection.findOne({ username });
    if (user && user.password === password) {
      const loggedInUsername = user.username;
      const todos = await getDataFromDatabase(loggedInUsername);
      res.json({
        success: true,
        message: "Login successful",
        username: user.username,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Error during login" });
  }
});

app.get("/api/todos", async (req, res) => {
  try {
    const data = await getDataFromDatabase();
    res.json(data);
    const { username } = req.query;
    const user = await getUserFromDatabase(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };
    res.json(user._doc.todos ?? "no todos");
    console.log(user._doc.todos);
  } catch (error) {
    console.error("Error handling GET request", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = req.body;
    const result = await updateTodo(id, updatedTodo);
    res.json(result);
  } catch (error) {
    console.error("Error updating todo item: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = req.body;
    const result = await deleteTodo(id, todo);
    res.json(result);
  } catch (error) {
    console.error("Error deleting todo item: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/api/todos", async (req, res) => {
  try {
    const { priority, description, subtasks, username } = req.body;
    // const rawUser = await getUserFromDatabase(username);
    // const user = rawUser.toObject();

    const user = await getUserFromDatabase(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTodoData = {
      priority: priority,
      description: description,
      subtasks: subtasks || [],
    };

    await addTodo(newTodoData);
    console.log("newTodoData: ", newTodoData);

    if (!(user.todos && user.todos.length)) {
      user.todos = [];
    }

    user.todos.push(newTodoData);
    console.log("user's todos: ", user.todos);
    console.log("user: ", user);

    async () => {
      await user.save();
    }

    res.json({ message: "Todo added successfully" });

  } catch (error) {
    console.error("Error handling POST request", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
