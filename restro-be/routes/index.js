const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const tableRoute = require("./tableRoute");

// Mount user routes
router.use("/user", userRoute);
router.use("/orders", orderRoute);
router.use("/tables", tableRoute);

// Add more routes as needed

module.exports = router;
