const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {getDataFromDatabase, addDataToDatabase} = require('./logic');

const app = express();
app.use(cors());

const uri = process.env.URI ?? "";

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
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error("Error handling GET request", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/api/testing", async (req, res) => {
    try {
      await addDataToDatabase();
      res.json({ message: "Data added successfully" });
    } catch (error) {
      console.error("Error handling GET request", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

