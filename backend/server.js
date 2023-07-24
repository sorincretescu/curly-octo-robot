// Import required packages
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

// Create an instance of Express
const app = express();
app.use(cors());

// MongoDB connection URI
const uri = "mongodb+srv://admin:albastrugri@todos.nfgv3pq.mongodb.net/";

// Create a MongoDB client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getDataFromDatabase() {
  try {
    await client.connect();
    const database = client.db("Todos");
    const collection = database.collection("Todos");

    const data = await collection.find({}).toArray();

    await client.close();

    return data;
  } catch (error) {
    console.log("Error fetching data from the database", error);
    throw error;
  }
}
// Start the server
const PORT = 5000;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});