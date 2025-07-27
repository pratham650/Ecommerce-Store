const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white font-[Inter]">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center space-y-4">
        <h2 className="text-3xl font-bold text-green-600">🎉 Order Placed!</h2>
        <p className="text-gray-600">
          Thank you for shopping with us. Your order has been placed successfully!
        </p>
        <a
          href="/"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default OrderSuccess;
