import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Buy = () => {
  const { cartItems = [], clearCart } = useCart();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const isFormValid = () => {
    const { name, email, phone, address, city, pincode } = client;
    return (
      name.trim() &&
      email.trim() &&
      phone.trim() &&
      address.trim() &&
      city.trim() &&
      pincode.trim()
    );
  };

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    alert(`📲 OTP sent: ${newOtp}`); // Fake OTP for testing
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setIsVerified(true);
      alert("✅ OTP Verified!");
    } else {
      alert("❌ Incorrect OTP!");
    }
  };

  const handlePlaceOrder = async (paymentMethod) => {
    if (!isFormValid()) {
      alert("🚫 Please fill all delivery details.");
      return;
    }

    if (!isVerified) {
      alert("📲 Please verify your mobile number first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            productId: item._id, // Make sure item._id exists
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: {
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            city: client.city,
            pincode: client.pincode,
            paymentMethod: paymentMethod,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Order failed");

      alert("✅ Order Placed Successfully!");
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      alert("❌ Order Error: " + error.message);
      console.error("Order Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 font-[Inter]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Delivery Details</h1>

      {orderPlaced ? (
        <div className="p-6 bg-green-100 text-green-800 rounded-xl border border-green-400">
          ✅ Your order has been placed successfully!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* INPUT FIELDS */}
            <input type="text" placeholder="Full Name *" className="border p-3 rounded-lg"
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
            />
            <input type="email" placeholder="Email *" className="border p-3 rounded-lg"
              value={client.email}
              onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
            <div className="flex gap-2">
              <input type="tel" placeholder="Mobile Number *" className="border p-3 rounded-lg w-full"
                value={client.phone}
                onChange={(e) => setClient({ ...client, phone: e.target.value })}
              />
              <button type="button" className="bg-blue-600 text-white px-4 rounded" onClick={generateOtp} disabled={otpSent}>
                Send OTP
              </button>
            </div>

            {otpSent && !isVerified && (
              <div className="flex gap-2">
                <input type="text" placeholder="Enter OTP" className="border p-3 rounded-lg w-full"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                />
                <button type="button" className="bg-green-600 text-white px-4 rounded" onClick={verifyOtp}>
                  Verify
                </button>
              </div>
            )}

            <input type="text" placeholder="Address *" className="border p-3 rounded-lg"
              value={client.address}
              onChange={(e) => setClient({ ...client, address: e.target.value })}
            />
            <input type="text" placeholder="City *" className="border p-3 rounded-lg"
              value={client.city}
              onChange={(e) => setClient({ ...client, city: e.target.value })}
            />
            <input type="text" placeholder="Pincode *" className="border p-3 rounded-lg"
              value={client.pincode}
              onChange={(e) => setClient({ ...client, pincode: e.target.value })}
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Items:</h2>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item, idx) => (
              <li key={idx} className="border p-4 rounded-xl shadow flex justify-between items-center">
                <div className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size}, Color: {item.color}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-emerald-600">
                  ₹{item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>

          <div className="text-right text-xl font-semibold text-blue-700 mb-6">
            Total: ₹{totalPrice}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button onClick={() => handlePlaceOrder("QR Code")}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl text-lg font-semibold transition"
            >
              📷 Pay via QR Code
            </button>
            <button onClick={() => handlePlaceOrder("UPI ID")}
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl text-lg font-semibold transition"
            >
              🔗 Pay via UPI ID
            </button>
            <button onClick={() => handlePlaceOrder("Cash on Delivery")}
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl text-lg font-semibold transition"
            >
              💸 Cash on Delivery
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Buy;
