const mongoose = require("mongoose");
const userSchema = require("../../database/schemas/userSchema");
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

const addUser = async (userData) => {
    try {
        const newUser = new User({
            username: userData.username,
            password: userData.password,
        });
        await newUser.save();
    } catch (error) {
        console.error("Error registering the user to the database", error);
        throw error;
    }
}


module.exports = { addUser, getUserFromDatabase };