const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {
  getDataFromDatabase,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./logic");

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

app.get("/api/todos", async (req, res) => {
  try {
    const data = await getDataFromDatabase();
    res.json(data);
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
    const { priority, description, subtasks } = req.body;

    const newTodoData = {
      priority: priority,
      description: description,
      subtasks: subtasks || [],
    };

    await addTodo(newTodoData);

    res.json({ message: "Todo added successfully" });
  } catch (error) {
    console.error("Error handling POST request", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const usersCollection = mongoose.connection.collection("users");
    const user = await usersCollection.findOne({ username });
    if (user && user.password === password) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Error during login" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
