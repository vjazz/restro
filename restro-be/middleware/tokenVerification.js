const { accessTokenSecret } = require("../config/config");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../models/userModel");

const isVerifiedUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  console.log("Authorization header:", authHeader);
  const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    console.log("Verifying token:", token);
    console.log("Verifying token:", accessTokenSecret);
    const decoded = jwt.verify(token, accessTokenSecret);
    console.log("Verifying decoded:", decoded);
    req.user = decoded; // Attach user info to request object
    const user = await User.findById(decoded.userId);
    console.log("Verifying user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // Attach full user object to request
    console.log("Verified .....");
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = isVerifiedUser;
