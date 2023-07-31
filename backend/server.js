const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {getDataFromDatabase, updateTodo} = require('./logic');

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

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
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
      const {id} = req.params;
      const updatedTodo = req.body;
      const result = await updateTodo(id, updatedTodo);
      res.json(result);
    } catch (error) {
      console.error("Error updating todo item: ", error);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

