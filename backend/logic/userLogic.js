const mongoose = require("mongoose");
const userSchema = require("../../database/schemas");
const User = mongoose.model("User", userSchema);

const getUsersFromDatabase = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        console.log("Error getting the user from db", error);
        throw error;
    }
};

module.exports = { getUsersFromDatabase };
