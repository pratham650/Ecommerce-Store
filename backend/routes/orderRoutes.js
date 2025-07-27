const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

//  User-side
router.post("/", protect, placeOrder); // Place an order
router.get("/", protect, getUserOrders); // View user order history

//  Admin-side
router.get("/admin", protect, admin, getAllOrders); // View all orders
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
