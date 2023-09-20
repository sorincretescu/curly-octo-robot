const mongoose = require("mongoose");
const userSchema = require("../../database/schemas/userSchema");
const User = mongoose.model("User", userSchema);

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
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        };
        return user;
    } catch (error) {
        console.error("Error getting user by id", error);
        throw error;
    }
};


module.exports = { addUser, getUserById };