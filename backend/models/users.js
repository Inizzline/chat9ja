import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePicture: {
        type: String,
        default: ""
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
export default User;