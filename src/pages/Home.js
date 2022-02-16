import {
  Button,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Box,
  createTheme,
  ThemeProvider,
  CircularProgress,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import Products from "../components/Products";

let offset;

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [values, setValues] = useState({
    searchBox: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  console.log(values);

  useEffect(() => {
    offset = 0;
    fetchProducts();
  }, []);

  useEffect(() => {
    loadMoreProducts();
    console.log(allProducts);
  }, [allProducts]);

  const fetchProducts = () => {
    return axios.get("https://fakestoreapi.com/products").then((res) => {
      setAllProducts(res.data);
    });
  };

  const loadMoreProducts = () => {
    if (allProducts.length == 0) return null;

    const newProducts = [];

    allProducts.slice(offset, offset + 4).forEach((product) => {
      newProducts.push(product);
    });

    setProducts((oldProducts) => [...oldProducts, ...newProducts]);

    offset += 4;
  };

  const handleFilterChange = (e) => {};

  const theme = createTheme();

  theme.typography.h1 = {
    fontSize: "2.5rem",
    fontWeight: "normal",
    "@media (min-width:600px)": {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3.5rem",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App"
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f4f4f4",
            borderBottom: "1px solid #d5d5d5",
            width: "100%",
            position: "fixed",
            zIndex: "999",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Container>
            <Typography variant="h1">Products List</Typography>
            <Typography>
              {products.length}/{allProducts.length} products
            </Typography>
          </Container>
        </Box>

        <Container sx={{ paddingTop: "10rem", paddingBottom: "5rem" }}>
          <Box
            sx={{
              width: "100%",
              marginBottom: "1rem",
              display: "grid",
              gap: "1rem",
              gridTemplateAreas: `"a a"
              "b c"`,
            }}
          >
            <TextField
              sx={{ width: "100%", gridArea: "a" }}
              label="Search"
              variant="outlined"
              value={values.searchBox}
              onChange={handleChange("searchBox")}
            />
            <FormControl sx={{ gridArea: "b" }}>
              <InputLabel htmlFor="outlined-adornment">Min price</InputLabel>
              <OutlinedInput
                id="min-price"
                value={values.minPrice}
                onChange={handleChange("minPrice")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Min price"
              />
            </FormControl>
            <FormControl sx={{ gridArea: "c" }}>
              <InputLabel htmlFor="outlined-adornment">Max price</InputLabel>
              <OutlinedInput
                id="max-price"
                value={values.maxPrice}
                onChange={handleChange("maxPrice")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Max price"
              />
            </FormControl>
          </Box>

          <Products products={products} />

          {products.length == 0 && (
            <Box
              sx={{ display: "grid", placeContent: "center", height: "20rem" }}
            >
              <CircularProgress />
            </Box>
          )}

          {products.length < allProducts.length && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                loadMoreProducts();
              }}
              sx={{ marginTop: "2rem" }}
            >
              More
            </Button>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
