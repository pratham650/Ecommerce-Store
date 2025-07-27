import { useState } from "react";
import FilterPanel from "../components/Filterpanel";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import cupProduct from "../data/cupProduct";
import botelProduct from "../data/botelProduct";

const CupAndBottle = () => {
  const { searchTerm } = useSearch();

  const [filters, setFilters] = useState({
    size: [],        // For cup
    ml: [],          // For bottle
    design: [],      // Shared between both
    price: 2000,
  });

  const [visibleCount, setVisibleCount] = useState(20);

  // Filtering Cups
  const filteredCups = cupProduct.filter((product) => {
    const sizeMatch = filters.size.length === 0 || filters.size.includes(product.size);
    const designMatch = filters.design.length === 0 || filters.design.includes(product.design);
    const priceMatch = product.price <= filters.price;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return sizeMatch && designMatch && priceMatch && searchMatch;
  });

  // Filtering Bottles
  const filteredBottles = botelProduct.filter((product) => {
    const mlMatch = filters.ml.length === 0 || filters.ml.includes(product.size); // 'size' is ml here
    const designMatch = filters.design.length === 0 || filters.design.includes(product.design);
    const priceMatch = product.price <= filters.price;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return mlMatch && designMatch && priceMatch && searchMatch;
  });

  const handleSeeMore = () => setVisibleCount((prev) => prev + 20);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 🧰 Filters */}
        <aside className="md:w-1/4 w-full bg-white rounded-xl shadow-md p-5 border border-purple-100 sticky top-4 h-fit">
          <h3 className="text-xl font-semibold text-purple-800 mb-4 border-b pb-2">Filters</h3>
          <FilterPanel
            onFilterChange={setFilters}
            options={{
              size: ["Small", "Medium", "Large"],
              ml: ["250ml", "500ml", "1L"],
              design: ["Plain", "Printed", "Minimal", "Logo", "Gradient", "Funky"],
              price: true,
            }}
          />
        </aside>

        {/* 🌟 Products */}
        <main className="w-full md:w-3/4 space-y-16">
          {/* ☕ Cup Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">☕ Cup Collection</h2>
            {filteredCups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCups.slice(0, visibleCount).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-amber-600 font-bold mt-1">₹ {product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-8 text-center">😕 No matching cups found. We Will Add this Soon</p>
            )}
          </section>

          {/* 💧 Bottle Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">💧 Water Bottles</h2>
            {filteredBottles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBottles.slice(0, visibleCount).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-cyan-600 font-bold mt-1">₹ {product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-8 text-center">😕 No matching bottles found.</p>
            )}
          </section>

          {/* See More */}
          {(visibleCount < filteredCups.length || visibleCount < filteredBottles.length) && (
            <div className="text-center mt-10">
              <button
                onClick={handleSeeMore}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition"
              >
                See More
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CupAndBottle;
