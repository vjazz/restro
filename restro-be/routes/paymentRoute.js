const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");
const isVerifiedUser = require("../middleware/tokenVerification");

// Apply token verification middleware to all routes in this router
router.use(isVerifiedUser);

// Define payment routes
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;
