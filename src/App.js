import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductId from "./pages/products/[productId]";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/products/:productId" element={<ProductId />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
