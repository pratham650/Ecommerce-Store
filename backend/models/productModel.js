const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    category: String,
    color: String,
    style: String,
    image: String,
    price: { type: Number, required: true },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
