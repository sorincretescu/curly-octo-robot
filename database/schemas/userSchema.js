const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

module.exports = userSchema;
