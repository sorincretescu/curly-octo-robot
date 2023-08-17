const mongoose = require("mongoose");
const todoSchema = require("../../database/schemas");
const Todo = mongoose.model("Todo", todoSchema);

const getDataFromDatabase = async (username) => {
  try {
    const data = await Todo.find({ username });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching data from the database", error);
    throw error;
  }
};

const addTodo = async (todoData, user) => {
  try {
    const newTodo = new Todo({
      priority: todoData.priority,
      description: todoData.description,
      subtasks: todoData.subtasks || [],
      user: user._id,
    });

    await newTodo.save();
  } catch (error) {
    console.error("Error adding data to the database:", error);
    throw error;
  }
};

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

const deleteTodo = async (id, todo) => {
  try {
    const result = await Todo.findByIdAndDelete(id, todo, {
      new: true,
    });
    return result;
  } catch (error) {
    console.log("Error deleting todo in the database", error);
    throw error;
  }
};

module.exports = { getDataFromDatabase, updateTodo, deleteTodo, addTodo };
