const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  // todo_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

module.exports = userSchema;
