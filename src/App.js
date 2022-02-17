import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductId from "./pages/products/[productId]";
import Cart from "./components/Cart";
import CartProvider from "./contexts/ApiContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:productId" element={<ProductId />} />
            </Routes>
          </div>
          <Cart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
