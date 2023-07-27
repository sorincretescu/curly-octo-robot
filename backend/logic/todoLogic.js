const mongoose = require("mongoose");
const todoSchema = require("../../database/schemas");
const Todo = mongoose.model("Todo", todoSchema);

async function getDataFromDatabase() {
  try {
    const data = await Todo.find({});
    console.log("Data retrieved:", data);
    return data ?? [];
  } catch (error) {
    console.log("Error fetching data from the database", error);
    throw error;
  }
}

async function addDataToDatabase() {
  try {
    const newTodo = new Todo({
      priority: 1,
      description: "mare titlu de testat brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr ra papa bum bum mare test",
      subtasks: ["abcd"],
    });

    await newTodo.save();
    console.log("Data added successfully:", newTodo);
  } catch (error) {
    console.error("Error adding data to the database:", error);
    throw error;
  }
}

module.exports = { getDataFromDatabase, addDataToDatabase };
