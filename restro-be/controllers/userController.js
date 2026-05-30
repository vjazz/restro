const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { accessTokenSecret } = require("../config/config");

const registerUser = async (req, res, next) => {
  try {
    console.log("Register user controller called");
    const { name, phone, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password || !phone || !role) {
      const error = createHttpError(400, "All fields are required");
      throw error;
    }

    // Here you would typically check if the user already exists,
    // hash the password, and save the user to the database.

    const user = await User.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already exists");
      throw error;
    }

    // Hash the password before saving (you can use bcrypt or similar library)
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phone, email, password, role });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const loginUser = async (req, res, next) => {
  try {
    console.log("Login user controller called");
    const { email, password } = req.body;
    console.log("Login user controller called", req.body);
    // Basic validation
    if (!email || !password) {
      const error = createHttpError(400, "Email and password are required");
      throw error;
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      const error = createHttpError(404, "User not found");
      throw error;
    }
    // Check if the password is correct (you would typically use bcrypt to compare hashes)
    if (!(await bcrypt.compare(password, user.password))) {
      const error = createHttpError(401, "Invalid credentials");
      throw error;
    }

    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "none", // Adjust based on your frontend domain
      maxAge: 60 * 60 * 1000 * 24 * 30, // 30 days
    });

    res
      .status(200)
      .json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const getUserData = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to set req.user
    // console.log("Get user data controller called for userId:", req.user);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = createHttpError(404, "User not found");
      throw error;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "none", // Adjust based on your frontend domain
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  logoutUser,
};
