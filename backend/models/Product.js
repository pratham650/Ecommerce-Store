const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide product title"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    category: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
