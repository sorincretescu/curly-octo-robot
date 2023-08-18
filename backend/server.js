const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    console.log("data", {
      priority: 2,
      description: "tets",
      subtasks: ["sub1"],
    });
    await addTodo({
      priority: 2,
      description: "tets",
      subtasks: ["sub1"],
    });

    res.json({ message: "Todo added successfully" });
  } catch (error) {
    console.error("Error handling POST request", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
