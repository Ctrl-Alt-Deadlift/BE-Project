import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  cartData: {
    type: Object,
    default: {}
  }

}, { minimize: false, timestamps: true });

// chances of error over here

// if model is already created use that model else create a new model
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;