import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        default: null, // For Google login, password remains null
    },

    phone: {
        type: String,
        default: null, // For Google login, phone can be null
        match: [/^\d{10}$/, "Invalid phone number"], // Ensures exactly 10 digits
    },

    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Default avatar for manual users
    },

    loginType: {
        type: String,
        enum: ["google", "manual"],
        default: "google", // 👈 Default is Google
    },
},
    { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;
