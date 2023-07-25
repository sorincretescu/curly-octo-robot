import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
});