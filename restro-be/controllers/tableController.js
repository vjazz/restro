const mongoose = require("mongoose");
const Table = require("../models/tableModel");

const addTable = async (req, res, next) => {
  try {
    // Implement logic to add a new table
    const { tableNo, seats } = req.body;
    if (!tableNo) {
      const error = createHttpError(400, "Table number is required");
      throw error;
    }
    const existingTable = await Table.findOne({ tableNo });
    console.log("Received table number:", existingTable); // Debugging log

    if (existingTable) {
      const error = createHttpError(400, "Table number already exists");
      throw error;
    }
    const newTable = new Table({ tableNo, seats });
    await newTable.save();
    res.status(201).json({
      success: true,
      message: "Table added successfully",
      data: newTable, // Replace with actual table data
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const getTables = async (req, res, next) => {
  try {
    // Implement logic to retrieve tables
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails",
    });
    res.status(200).json({
      success: true,
      message: "Tables retrieved successfully",
      data: tables, // Replace with actual tables data
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const updateTable = async (req, res, next) => {
  try {
    // Implement logic to update an existing table
    const tableId = req.params.id;

    if (mongoose.Types.ObjectId.isValid(tableId)) {
      const error = createHttpError(404, "Invalid Table ID");
      throw error;
    }

    const { status, orderId, seats } = req.body; // Extract fields to update from request body
    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      { status, orderId, seats },
      { new: true },
    );
    if (!updatedTable) {
      const error = createHttpError(404, "Table not found");
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Table updated successfully",
      data: updatedTable, // Replace with actual updated table data
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

module.exports = {
  addTable,
  getTables,
  updateTable,
};
