const Product = require("../models/Product");

// @desc   Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// @desc   Get single product by ID
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json(product);
};

// @desc   Create a new product (Admin only)
exports.createProduct = async (req, res) => {
  const { title, description, price, category, countInStock, image } = req.body;

  const product = new Product({
    title,
    description,
    price,
    category,
    countInStock,
    image,
  });

  const saved = await product.save();
  res.status(201).json(saved);
};

// @desc   Update a product (Admin only)
exports.updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
  res.status(200).json(updatedProduct);
};

// @desc   Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.status(200).json({ message: "Product deleted" });
};
