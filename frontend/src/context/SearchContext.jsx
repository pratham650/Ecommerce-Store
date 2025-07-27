import { createContext, useContext, useState } from "react";
import menProducts from "../data/menProducts";
import girlsProduct from "../data/girlsProduct";
import cupProduct from "../data/cupProduct";
import botelProduct from "../data/botelProduct";

const SearchContext = createContext();

// ✅ Merge all products (assumes IDs are unique like "men-001")
const allProducts = [
  ...menProducts,
  ...girlsProduct,
  ...cupProduct,
  ...botelProduct,
];

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  const searchProducts = (term) => {
    setSearching(true);
    setSearchTerm(term);

    setTimeout(() => {
      const filtered = allProducts.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filtered);
      setSearching(false);
    }, 1000); // 1 second delay
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searching,
        setSearching,
        results,
        setResults,
        allProducts,
        searchProducts,
      }}
    >
      {/* ✅ Loader with logo */}
      {searching && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-[9999]">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Spinning ring */}
            <div className="absolute w-full h-full border-[6px] border-t-[#800000] border-b-[#800000] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
            {/* Logo in center */}
            <img
              src="/logo.jpg"
              alt="Loading"
              className="w-16 h-16 object-contain rounded-full z-10 shadow-xl"
            />
          </div>
        </div>
      )}

      {children}
    </SearchContext.Provider>
  );
};

// ✅ Custom hook
export const useSearch = () => useContext(SearchContext);
