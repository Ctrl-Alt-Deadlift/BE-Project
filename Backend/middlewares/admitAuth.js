import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({ success: false, message: "Unauthorized attempt to login!" });
    }
    // decode the token sent by the user.
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ success: false, message: "Invalid login credentials!" });
    }
    next();

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export default adminAuth;