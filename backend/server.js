const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todoSchema = require("../database/schemas/todoSchema");
const Todo = mongoose.model("Todo", todoSchema);


// Create an instance of Express
const app = express();
app.use(cors());

// MongoDB connection URI
const uri = process.env.URI ?? "";

// Create a MongoDB client
const mongooseOptions = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

(async () => {
  try {
    await mongoose.connect(uri, mongooseOptions);
    console.log("Connected to MongoDB");

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
    // Use the 'disconnected' event to handle disconnections
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    startServer(Todo);
    

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();


async function getDataFromDatabase(Todo) {
  try {
    const data = await Todo.find({});
    console.log("Data retrieved:", data); // Add this line to log the data
    return data ?? [];
  } catch (error) {
    console.log("Error fetching data from the database", error);
    throw error;
  }
}

// Function to add data to the database
async function addDataToDatabase() {
  try {
    // Create a new Todo document
    const newTodo = new Todo({
      priority: 1,
      description: "mare titlu de testat brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr ra papa ",
      subtasks:["abcd"],
    });

    // Save the document to the database
    await newTodo.save();

    console.log("Data added successfully:", newTodo);
  } catch (error) {
    console.error("Error adding data to the database:", error);
  }
}

function startServer(Todo) {
  app.get("/api/todos", async (req, res) => {
    try {
      const data = await getDataFromDatabase(Todo);
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error("Error handling GET request", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/api/testing", async (req, res) => await addDataToDatabase())

  // Start the server
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
