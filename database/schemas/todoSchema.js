const mongoose = require("mongoose");
const { Schema } = mongoose;


const todoSchema = new Schema({
    priority: Number,
    description: String,
    subtasks: [String],
}, { timestamps: true }
);


module.exports = todoSchema;