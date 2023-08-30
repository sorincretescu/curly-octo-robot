const mongoose = require("mongoose");
const { Schema } = mongoose;


const todoSchema = new Schema({
    priority: Number,
    description: String,
    subtasks: [String],
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

}, { timestamps: true }
);


module.exports = todoSchema;