import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductId from "./pages/products/[productId]";
import Cart from "./components/Cart";
import ContextProvider from "./contexts/ApiContext";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fff",
        contrastText: "#000",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        im: 1000,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  theme.typography.h1 = {
    fontSize: "2rem",
    fontWeight: "normal",
    "@media (min-width:600px)": {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3.5rem",
    },
  };

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
