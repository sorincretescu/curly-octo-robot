// Import required packages
const express = require('express');
const { MongoClient } = require('mongodb');

// Create an instance of Express
const app = express();

// MongoDB connection URI
const uri = "mongodb+srv://aleneagu96:vBjfPY8qNECMNwcI@todo.orth1vn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoDB client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
const PORT = 5000; // You can choose any available port number
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
