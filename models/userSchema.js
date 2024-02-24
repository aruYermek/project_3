
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bio: String,
    avatar: String
}, {

    collection: "login",
    timestamps: true
});
module.exports = mongoose.model("User", userSchema);
