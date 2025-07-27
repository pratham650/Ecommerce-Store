import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import menProducts from "../data/menProducts";
import girlsProduct from "../data/girlsProduct";
import cupProduct from "../data/cupProduct";
import botelProduct from "../data/botelProduct";

const Home = () => {
  const { searchTerm, results, searching } = useSearch();

  // Always call hooks at top level
  const fadeMen = useScrollFadeIn();
  const fadeWomen = useScrollFadeIn();
  const fadeCup = useScrollFadeIn();
  const fadeBottle = useScrollFadeIn();

  const images = [
    { id: "product1", url: "/bottle/t6.png", label: "Boys T-Shirts" },
    { id: "product2", url: "/bottle/girls/t1.png", label: "Girls T-Shirt" },
    { id: "product3", url: "/bottle/cup/c1.png", label: "Cups" },
    { id: "product4", url: "/bottle/botel/b1.png", label: "Bottles" },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto font-sans">
      {searchTerm ? (
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 tracking-tight">
            Search Results for <span className="text-indigo-600">"{searchTerm}"</span>
          </h2>

          {searching ? (
            <p className="text-indigo-500 text-lg font-medium animate-pulse">
              Searching...
            </p>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {results.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:border-indigo-400"
                >
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">Category: {item.category}</p>
                    {item.price && (
                      <p className="text-green-600 font-bold text-lg mt-2">
                        ₹{item.price}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-red-500 text-lg mt-4 font-medium">
              No matching products found.
            </p>
          )}
        </>
      ) : (
        <>
          {/* 🔥 Hero Heading */}
          <div className="text-center mt-2 mb-3">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              Wear Your <span className="text-indigo-600">Style</span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg md:text-xl">
              Start exploring by selecting a category or searching above.
            </p>
            <p className="text-gray-600 mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Discover fresh and customizable t-shirts made just for you.
              Designed with love, printed with perfection.
            </p>
          </div>

          {/* 🎯 HERO CAROUSEL */}
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-16 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center shadow-xl">
            {images.map((img, i) => (
              <div
                key={i}
                className={`absolute flex flex-col items-center justify-center w-full transition-opacity duration-1000 ease-in-out ${
                  i === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Link to={`/product/${img.id}`}>
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-[300px] h-[300px] object-contain rounded-2xl shadow-md border border-gray-300 bg-white p-2"
                  />
                </Link>
                <Link
                  to="/products"
                  className="mt-4 px-6 py-3 bg-indigo-600 text-white text-lg rounded-full shadow hover:bg-indigo-700 transition z-20"
                >
                  Shop Now
                </Link>
              </div>
            ))}
            <div className="absolute top-6 left-6 bg-gray-800 bg-opacity-70 text-white text-xl px-5 py-2 rounded-md shadow-md z-20">
              {images[currentImage].label}
            </div>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow hover:bg-gray-200 z-20"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow hover:bg-gray-200 z-20"
            >
              ❯
            </button>
          </div>

          {/* 🔥 Men's Collection */}
          <section {...fadeMen} className="mt-16 pb-16 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
              🔥 Men's Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {menProducts.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group block bg-white border rounded-xl shadow hover:shadow-lg transition duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/men"
                className="inline-block px-5 py-2 bg-indigo-600 text-white text-md font-medium rounded-full shadow hover:bg-indigo-700 transition"
              >
                Explore Full Collection
              </Link>
            </div>
          </section>

          {/* 👩 Girls Collection */}
          <section {...fadeWomen} className="mt-24 pb-16 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              💖 Top Picks from <span className="text-pink-500">Girls Collection</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {girlsProduct.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group block bg-white border rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-500 transition">
                      {product.name}
                    </h3>
                    <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/women"
                className="px-6 py-3 bg-pink-600 text-white text-lg font-semibold rounded-full hover:bg-pink-700 transition"
              >
                Explore Full Collection
              </Link>
            </div>
          </section>

          {/* ☕ Cups Collection */}
          <section {...fadeCup} className="mt-24 pb-16 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              ☕ Stylish <span className="text-amber-600">Cup Collection</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {cupProduct.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group block bg-white border rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-amber-600 font-bold mt-1">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/category/cups"
                className="px-6 py-3 bg-amber-600 text-white text-lg font-semibold rounded-full hover:bg-amber-700 transition"
              >
                See More Cups
              </Link>
            </div>
          </section>

          {/* 💧 Bottles Collection */}
          <section {...fadeBottle} className="mt-24 pb-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              💧 Stay Hydrated with <span className="text-cyan-600">Bottles</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {botelProduct.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group block bg-white border rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-cyan-600 font-bold mt-1">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/category/bottles"
                className="px-6 py-3 bg-cyan-600 text-white text-lg font-semibold rounded-full hover:bg-cyan-700 transition"
              >
                See More Bottles
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
