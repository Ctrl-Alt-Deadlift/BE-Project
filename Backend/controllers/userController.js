import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.status(200).json({ success: true, message: "User LoggedIn", token });
    }

    else {
      return res.status(400).json({ success: false, message: "Invalid login credentials" });
    }
  }

  catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
}


// Route for use signup
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;
    // checking user exists or not

    try {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email." });
      }


      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Please enter a strong password." });
      }

    }

    catch (error) {
      res.status(400).json({ message: "Something went wrong in validation" });
    }


    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  }

  catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }

}

// Route for admin login
const adminLogin = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // token is created using the email and password so the decoded token also must contain
      // email and password.
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ "success": true, token });
    }

    else {
      res.status(400).json({ "success": false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ "success": false, message: error.message });
  }

}

export { loginUser, registerUser, adminLogin };