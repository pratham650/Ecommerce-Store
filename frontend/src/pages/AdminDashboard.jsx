import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("❌ Failed to update status.");
    }
  };

  if (loading) return <p className="text-center p-10">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 font-[Inter] bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Admin Dashboard - Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Email</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Address</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-4">{order.userId?.name}</td>
                <td className="p-4">{order.userId?.email}</td>
                <td className="p-4 text-sm">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.productId} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-4 text-green-700 font-semibold">₹{order.totalAmount}</td>
                <td className="p-4">
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="p-4 text-sm">{order.shippingAddress}</td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
