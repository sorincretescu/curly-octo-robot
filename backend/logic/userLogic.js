const mongoose = require("mongoose");
const userSchema = require("../../database/schemas");
const User = mongoose.model("User", userSchema);

// getUsersFromDatabase sounds like a function that gets USERS, not user

const getUsersFromDatabase = async (username) => {
    try {
        const data = await User.findOne({ username });
        return data ?? [];
    } catch (error) {
        console.log("Error getting the user from db", error);
        throw error;
    }
};

module.exports = { getUsersFromDatabase };
