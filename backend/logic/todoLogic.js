const mongoose = require("mongoose");
const todoSchema = require("../../database/schemas");
const Todo = mongoose.model("Todo", todoSchema);

const getDataFromDatabase = async () => {
  try {
    const data = await Todo.find({});
    return data ?? [];
  } catch (error) {
    console.log("Error fetching data from the database", error);
    throw error;
  }
}


const addDataToDatabase = async (todoData) => {
  try {
    const newTodo = new Todo({
      priority: todoData.priority,
      description: todoData.description,
      subtasks: todoData.subtasks || [],
    });

    await newTodo.save();
  } catch (error) {
    console.error("Error adding data to the database:", error);
    throw error;
  }
}

const updateTodo = async (id, updatedTodo) => {
  try {
    const result = await Todo.findByIdAndUpdate(id, updatedTodo, {
      new: true,
    });
    return result;
  } catch (error) {
    console.log("Error updating todo in the database", error);
    throw error;
  }
};

module.exports = { getDataFromDatabase, addDataToDatabase, updateTodo };
