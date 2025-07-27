import { Link } from "react-router-dom";

const ProductCard = ({ id, name, image, price }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
        <h3 className="mt-2 text-lg font-semibold">{name}</h3>
        <p className="text-blue-600 font-bold">₹{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
