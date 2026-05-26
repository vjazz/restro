const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrderById,
  getOrders,
  updateOrder,
} = require("../controllers/orderController");
const isVerifiedUser = require("../middleware/tokenVerification");

// Apply token verification middleware to all routes in this router
router.use(isVerifiedUser);

// Define order routes
router.post("/", addOrder);
router.get("/:id", getOrderById);
router.get("/", getOrders);
router.put("/:id", updateOrder);

module.exports = router;
