import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterPanel = ({ onFilterChange, options = {} }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    size: [],
    ml: [],
    design: [],
    brands: [],
    price: 2000,
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const toggleCheckbox = (field, value) => {
    const updated = filters[field].includes(value)
      ? filters[field].filter((item) => item !== value)
      : [...filters[field], value];

    setFilters((prev) => ({ ...prev, [field]: updated }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({ ...prev, price: value }));
  };

  const renderCheckboxGroup = (label, field, values) => (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-700 mb-2">{label}</h4>
      <div className="flex flex-col gap-2 text-sm">
        {values.map((val) => (
          <label key={val} className="flex items-center gap-2 text-gray-600 capitalize">
            <input
              type="checkbox"
              checked={filters[field]?.includes(val)}
              onChange={() => toggleCheckbox(field, val)}
            />
            {val}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md border border-blue-100">
      {/* Mobile Toggle */}
      <div className="md:hidden mb-4">
        <button
          className="w-full flex items-center justify-between bg-white border px-4 py-2 rounded-md"
          onClick={() => setOpen(!open)}
        >
          <span className="font-medium">Filter</span>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <div className={`${open ? "block" : "hidden"} md:block mt-4 md:mt-0`}>
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Filters</h3>

        {/* Dynamically render checkboxes */}
        {options.brands && renderCheckboxGroup("Brand", "brands", options.brands)}
        {options.size && renderCheckboxGroup("Size", "size", options.size)}
        {options.ml && renderCheckboxGroup("Quantity (ml)", "ml", options.ml)}
        {options.design && renderCheckboxGroup("Design", "design", options.design)}

        {/* Price Range */}
        {options.price && (
          <div className="mb-2">
            <h4 className="font-semibold text-gray-700 mb-2">Price</h4>
            <input
              type="range"
              min="100"
              max="3000"
              step="100"
              value={filters.price}
              onChange={handlePriceChange}
              className="w-full accent-blue-600"
            />
            <div className="text-sm text-gray-500 mt-1">Up to ₹{filters.price}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
