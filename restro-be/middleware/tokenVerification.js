const { accessTokenSecret } = require("../config/config");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../models/userModel");
const config = require("../config/config");

const isVerifiedUser = async (req, res, next) => {
  try {
    console.log("verification called....", req);
    const { accessToken } = req.cookies;
    console.log("Access Token from cookies:", accessToken); // Debugging log
    if (!accessToken) {
      const error = createHttpError(401, "Please provide token!");
      return next(error);
    }

    console.log("Decoding token...");
    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);
    console.log("Decoded Token:", decodeToken);

    const user = await User.findById(decodeToken.userId);
    if (!user) {
      const error = createHttpError(401, "User not exist!");
      return next(error);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = isVerifiedUser;
