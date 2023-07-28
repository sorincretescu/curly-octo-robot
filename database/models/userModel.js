import mongoose from "mongoose";

 const User = mongoose.model("User", {userSchema});

 const user = new User({username:'test', password:'test'});
 await user.save();