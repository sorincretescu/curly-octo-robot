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
};

const addTodo = async (todoData) => {
  try {
    // const newTodo = new Todo();
    // newTodo.priority = 1;
    // newTodo.description = "Test description";
    // newTodo.subtasks = ["Subtask 1", "Subtask 2"];
    await Todo.create(todoData);

    console.log(todoData);
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
