import { useState, useMemo } from "react";
import { useSearch } from "../context/SearchContext";
import girlsProduct from "../data/girlsProduct";
import { Link } from "react-router-dom";

const Women = () => {
  const { searchTerm } = useSearch();

  const [filters, setFilters] = useState({
    styles: [],
    colors: [],
  });

  const [visibleCount, setVisibleCount] = useState(20);
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

  const styleOptions = [
    "Oversized",
    "Regular Fit",
    "Hoodie",
  ];

  const colorOptions = [
    "Black",
    "White",
    "Maroon",
    "Yellow",
    "Red",
    "Navy Blue",
    "Bottel Green",
  ];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const filteredProducts = useMemo(() => {
    const result = girlsProduct.filter((product) => {
      const styleMatch =
        filters.styles.length === 0 || filters.styles.includes(product.style);
      const colorMatch =
        filters.colors.length === 0 || filters.colors.includes(product.color);
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return styleMatch && colorMatch && searchMatch;
    });
    return shuffleArray(result);
  }, [filters, searchTerm]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md w-full"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Panel */}
        {(showFilters || window.innerWidth >= 768) && (
          <aside className="md:w-1/4 w-full bg-white rounded-xl shadow-md p-5 border border-pink-100 sticky top-4 h-fit">
            <h3 className="text-xl font-semibold text-pink-600 mb-4 border-b pb-2">Filters</h3>

            {/* Style Filter */}
            <div className="mb-6">
              <h4 className="text-gray-700 font-medium mb-2">Style</h4>
              {styleOptions.map((style) => (
                <label key={style} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.styles.includes(style)}
                    onChange={() => handleFilterChange("styles", style)}
                    className="accent-pink-500"
                  />
                  <span className="text-gray-600">{style}</span>
                </label>
              ))}
            </div>

            {/* Color Filter */}
            <div>
              <h4 className="text-gray-700 font-medium mb-2">Color</h4>
              {colorOptions.map((color) => (
                <label key={color} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color)}
                    onChange={() => handleFilterChange("colors", color)}
                    className="accent-pink-500"
                  />
                  <span className="text-gray-600">{color}</span>
                </label>
              ))}
            </div>
          </aside>
        )}

        {/* Product Section */}
        <main className="w-full md:w-3/4">
          <div className="w-full flex justify-start mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
              👗 Women’s Collection
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[250px] object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-pink-600 font-bold mt-1">₹ {product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleSeeMore}
                    className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-sm transition"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center mt-16">
              <p className="text-gray-600 text-lg">😕 No matching products found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Women;
