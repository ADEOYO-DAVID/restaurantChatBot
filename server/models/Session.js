const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  currentOrder: [orderSchema],
  orderHistory: [orderSchema]
});

module.exports = mongoose.model(
  "Session",
  sessionSchema
);