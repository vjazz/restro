require("dotenv").config();

module.exports = Object.freeze({
  port: process.env.PORT || 5000,
  databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/restro-db",
  nodeEnv: process.env.NODE_ENV || "development",
  accessTokenSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN,
});
