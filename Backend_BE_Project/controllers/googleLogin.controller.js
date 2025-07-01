import axios from 'axios';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { oauth2Client } from '../config/googleClient.js';

const googleAuth = async (req, res) => {
  
  const code = req.query.code;

  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;


    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        image: picture,
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT }
    );

    res.status(200).json({
      message: 'success',
      token,
      user,
    });

  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export default googleAuth;