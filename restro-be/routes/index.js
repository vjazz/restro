const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const tableRoute = require("./tableRoute");
const paymentRoute = require("./paymentRoute");

// Mount user routes
router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/table", tableRoute);
router.use("/payment", paymentRoute);

// Add more routes as needed

module.exports = router;
