import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductId from "./pages/products/[productId]";
import Cart from "./components/Cart";
import CartProvider from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<ProductId />} />
          </Routes>
          <Cart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
