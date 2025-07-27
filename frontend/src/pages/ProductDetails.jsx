import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

// Import product data
import menProducts from "../data/menProducts";
import girlsProduct from "../data/girlsProduct";
import cupProduct from "../data/cupProduct";
import botelProduct from "../data/botelProduct";
import unisexProducts from "../data/unisexProducts"; // ✅ Make sure this file exists

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const clothingSizes = ["S", "M", "L", "XL"];
  const cupSizes = ["Small", "Medium", "Large"];
  const bottleSizes = ["250ml", "500ml", "1L"];

  const defaultColors = [
    "Black", "White", "Maroon", "Yellow", "Navy Blue", "Red", "Bottle Green", "Green"
  ];

  const colorMap = {
    "Black": "#000000",
    "White": "#FFFFFF",
    "Maroon": "#800000",
    "Yellow": "#FFD700",
    "Navy Blue": "#000080",
    "Red": "#FF0000",
    "Bottle Green": "#006A4E",
    "Green": "#008000"
  };

  const designOptions = ["Plain", "Printed", "Minimal", "Logo"];

  // 🛠 Fix for refresh and back issue
  useEffect(() => {
    setProduct(null); // Clear previous state first

    const allProducts = [
      ...menProducts,
      ...girlsProduct,
      ...cupProduct,
      ...botelProduct,
      ...unisexProducts
    ];

    const foundProduct = allProducts.find(item => item.id === parseInt(id));
    setTimeout(() => {
      setProduct(foundProduct);
    }, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  const isClothing = [
    ...menProducts,
    ...girlsProduct,
    ...unisexProducts
  ].some(p => p.id === product.id);

  const isCup = cupProduct.some(p => p.id === product.id);
  const isBottle = botelProduct.some(p => p.id === product.id);

  const handleAddToCart = () => {
    if (
      (isClothing && (!selectedSize || !selectedColor)) ||
      ((isCup || isBottle) && (!selectedSize || !selectedDesign))
    ) {
      alert("Please select all required options.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor || null,
      design: selectedDesign || null,
      price: product.price,
    };

    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleBuyNow = () => {
    // 🛡️ Check login before proceeding
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to continue with purchase.");
      navigate("/login");
      return;
    }

    // Do add to cart logic
    if (
      (isClothing && (!selectedSize || !selectedColor)) ||
      ((isCup || isBottle) && (!selectedSize || !selectedDesign))
    ) {
      alert("Please select all required options.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor || null,
      design: selectedDesign || null,
      price: product.price,
    };

    addToCart(cartItem);

    navigate("/buy", {
      state: {
        product: cartItem,
      },
    });
  };

  return (
    <div className="bg-gradient-to-tr from-gray-50 via-white to-gray-100 min-h-screen py-12 px-4 font-[Inter]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-3xl w-full h-[500px] object-cover shadow-xl hover:scale-105 transition duration-300"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600">
            {isClothing
              ? "Soft fabric. Luxe fit. Crafted for all-day comfort."
              : "Premium material. Designed with care."}
          </p>
          <p className="text-3xl font-bold text-emerald-600">₹ {product.price}</p>

          <p className="text-gray-500">
            Brand:{" "}
            <span className="text-blue-600 font-semibold">
              {product.brand || "N/A"}
            </span>
          </p>

          {product.style && (
            <p className="text-gray-500">
              Style:{" "}
              <span className="text-purple-600 font-semibold">
                {product.style}
              </span>
            </p>
          )}

          {product.description && (
            <div>
              <h3 className="text-md font-semibold text-gray-700 mt-2">
                Description:
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Size Selector */}
          {(isClothing || isCup || isBottle) && (
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                {isBottle ? "Select Quantity" : "Select Size"}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(isClothing ? clothingSizes : isCup ? cupSizes : bottleSizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg font-semibold border-2 transition text-sm ${
                      selectedSize === size
                        ? "border-blue-600 text-blue-600 bg-blue-50"
                        : "border-gray-300 text-gray-700 hover:border-blue-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {isClothing && (
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                Select Color
              </label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {defaultColors.map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 cursor-pointer transition shadow-sm ${
                      selectedColor === color
                        ? "ring-2 ring-blue-600 scale-110"
                        : "hover:scale-105 border-gray-300"
                    }`}
                    style={{ backgroundColor: colorMap[color] || "#ccc" }}
                    title={color}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Design Selector */}
          {(isCup || isBottle) && (
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                Select Design
              </label>
              <div className="flex gap-3 flex-wrap">
                {designOptions.map((design) => (
                  <button
                    key={design}
                    onClick={() => setSelectedDesign(design)}
                    className={`px-4 py-2 rounded-xl border-2 font-medium ${
                      selectedDesign === design
                        ? "border-purple-600 text-purple-600 bg-purple-50"
                        : "border-gray-300 hover:border-purple-500 text-gray-700"
                    }`}
                  >
                    {design}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg w-full sm:w-auto"
            >
              {addedToCart ? "✅ Added to Cart!" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg w-full sm:w-auto"
            >
              Buy Now
            </button>
          </div>

          {(selectedSize || selectedColor || selectedDesign) && (
            <p className="text-sm text-gray-500 mt-2">
              Selected:
              {selectedSize && ` ${selectedSize}`}
              {selectedColor && ` / ${selectedColor}`}
              {selectedDesign && ` / ${selectedDesign}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
