import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Unisex from "./pages/Unisex";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Buy from "./pages/Buy";
import CupAndBottle from "./pages/CupAndBottle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/authContext";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider> 
      <Navbar />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route
          path="/product/:id"
          element={<ProductDetails key={location.pathname} />}
        />
        <Route path="/category/bottles" element={<CupAndBottle />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </AuthProvider>
  );
};

export default App;
