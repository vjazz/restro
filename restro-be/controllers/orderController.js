const mongoose = require("mongoose");
const Order = require("../models/orderModel");

const addOrder = async (req, res, next) => {
  try {
    // Implement logic to add a new order
    // const { customerDetails, orderStatus, bills, items } = req.body;
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order added successfully",
      data: newOrder, // Replace with actual order data
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const getOrderById = async (req, res, next) => {
  try {
    // Implement logic to retrieve orders
    const orderId = req.params.id;

    if (mongoose.Types.ObjectId.isValid(orderId)) {
      const error = createHttpError(404, "Invalid Order ID");
      throw error;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      const error = createHttpError(404, "Order not found");
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order, // Replace with actual order data
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const getOrders = async (req, res, next) => {
  try {
    // Implement logic to retrieve orders
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders, // Replace with actual orders data
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const updateOrder = async (req, res, next) => {
  try {
    // Implement logic to update an existing order
    const orderId = req.params.id;

    if (mongoose.Types.ObjectId.isValid(orderId)) {
      const error = createHttpError(404, "Invalid Order ID");
      throw error;
    }

    const { orderStatus } = req.body; // Extract fields to update from request body
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true },
    );
    if (!updatedOrder) {
      const error = createHttpError(404, "Order not found");
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder, // Replace with actual updated order data
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getOrders,
  updateOrder,
};
