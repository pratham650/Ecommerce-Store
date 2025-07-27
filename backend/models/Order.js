const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtPurchase: Number
    }
  ],
  totalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    pincode: String,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", orderSchema);
