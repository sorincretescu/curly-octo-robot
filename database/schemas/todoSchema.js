import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema({
    priority: Number,
    creationDate:String,
    description: String,
    subtasks:[String],
});