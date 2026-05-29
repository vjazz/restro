const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  logoutUser,
} = require("../controllers/userController");
const isVerifiedUser = require("../middleware/tokenVerification");
const router = express.Router();
// import controllers and middleware as needed

// Example user route
// router.get("/", (req, res) => {
//   res.send("User route");
// });

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example protected route
router.use(isVerifiedUser); // Apply token verification middleware to all routes below
router.post("/logout", logoutUser); // Add logout route
router.get("/", getUserData);

module.exports = router;
