const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const cors = require("cors");
require("dotenv").config();
const {
  getDataFromDatabase,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodoId
} = require("./logic/todoLogic");

const {
  addUser,
  getUserById,
} = require("./logic/userLogic");



const { restart } = require("nodemon");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.URI ?? "";
const port = process.env.PORT;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const store = new MongoDbStore({
  uri: uri,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

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

function auth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const usersCollection = mongoose.connection.collection("users");
    const user = await usersCollection.findOne({ username });

    if (user && user.password === password) {
      req.session.user = user;
      res.json({
        success: true,
        message: "Login successful",
        username: user.username,
      })
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Error during login" });
  }
});

app.get("/api/userdata", async (req, res) => {
  const user = req.query;
  const username = user.username;
  const todos = await getDataFromDatabase(username);
  res.json({
    success: true,
    message: "User data fetched successfully",
    username: username,
    todos: todos,
  });
})

app.post("/api/todos", async (req, res) => {
  try {
    const { priority, description, subtasks } = req.body;
    const userId = req.session.user._id;
    const newTodo = {
      priority: priority,
      description: description,
      subtasks: subtasks || [],
    };

    await addTodo(newTodo);

    const user = await getUserById(userId);
    console.log(user);
    const neededTodoId = await getTodoId(newTodo);
    user.todos.push(neededTodoId);
    user.markModified("todos");
    await user.save();

    res.status(201).json({
      success: true,
      message: "Todo added successfully",

    });
  } catch (error) {
    console.error("Error handling POST request", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


app.get("/api/todos", async (req, res) => {
  try {
    const loggedUser = req.session.user.username;
    console.log("user", loggedUser);
    const todos = await getDataFromDatabase(loggedUser);
    console.log("todos", todos);

    res.json(todos);
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


app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    };

    if (username.length < 4 || password.length < 4) {
      return res.status(400).json({ message: "Username and password need to be at least 4 characters long." });
    };

    const newUserData = {
      username: username,
      password: password,
    };

    await addUser(newUserData);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error handling POST request ", error);
    restart.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
