const Order = require("../models/Order");

// 🆕 Place Order
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cartItems, shippingAddress } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order = await Order.create({
      userId,
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.price,
      })),
      totalAmount: total,
      shippingAddress,
    });

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Order error", error: err.message });
  }
};

// 🧍 Get logged-in user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// 👑 Admin: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders", error: err.message });
  }
};

// ✅ Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", status });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};
