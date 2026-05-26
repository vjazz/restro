require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const createHttpError = require("http-errors");
const routes = require("./routes");

// Connect to MongoDB
connectDB();
const app = express();
const PORT = config.port;

// Middleware to parse JSON bodies
app.use(express.json());
//root route for testing
// app.get("/", (req, res) => {
//   //   const error = createHttpError(400, "Bad Request Example");
//   //   throw error; // This will be caught by the global error handler
//   res.send("Hello World!");
// });

app.use("/api", routes);

// Global error handling middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
