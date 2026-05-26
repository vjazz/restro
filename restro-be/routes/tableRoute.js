const express = require("express");
const router = express.Router();
const {
  addTable,
  getTables,
  updateTable,
} = require("../controllers/tableController");
const isVerifiedUser = require("../middleware/tokenVerification");

// Apply token verification middleware to all routes in this router
router.use(isVerifiedUser);

// Define table routes
router.post("/", addTable);
router.get("/", getTables);
router.put("/:id", updateTable);

module.exports = router;
