const mongoose = require("mongoose");
const userSchema = require("../../database/schemas");
const User = mongoose.model("User", userSchema);

const getUserFromDatabase = async (username) => {
    try {
        const data = await User.findOne({ username });
        return data ?? [];
    } catch (error) {
        console.log("Error getting the user from db", error);
        throw error;
    }
};

module.exports = { getUserFromDatabase };
