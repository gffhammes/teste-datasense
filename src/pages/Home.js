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

  //fetch data
  useEffect(() => {
    offset = 0;
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    return axios.get("https://fakestoreapi.com/products").then((res) => {
      setAllProducts(res.data);
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    offset = 0;
    if (values.searchBox == "") {
      loadMoreProducts(allProducts);
    } else {
      loadMoreProducts(filteredProducts);
    }
  }, [allProducts]);

  const handleLoadMoreProducts = () => {
    if (values.searchBox == "") {
      loadMoreProducts(allProducts);
    } else {
      loadMoreProducts(filteredProducts);
    }
  };

  useEffect(() => {
    handleFilterChange();
  }, [values]);

  useEffect(() => {
    offset = 0;
    if (values.searchBox != "" && filteredProducts.length == 0) {
      return null;
    }

    if (
      values.searchBox == "" ||
      filteredProducts.length == allProducts.length
    ) {
      loadMoreProducts(allProducts);
    } else {
      loadMoreProducts(filteredProducts);
    }
  }, [filteredProducts]);

  const handleFilterChange = () => {
    setFilteredProducts(
      allProducts.filter((product) => {
        if (
          product.title.toLowerCase().includes(values.searchBox.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  const loadMoreProducts = (products) => {
    console.log(products);
    if (products.length == 0) return null;
    const newProducts = [];
    products.slice(0, offset + 4).forEach((product) => {
      newProducts.push(product);
    });
    setProducts(newProducts);
    offset += 4;
  };

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
              {values.searchBox == "" || filteredProducts.length > 0
                ? `${products.length}/${
                    filteredProducts.length == 0
                      ? allProducts.length
                      : filteredProducts.length
                  } product(s)`
                : "0 product"}
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

          {values.searchBox == "" || filteredProducts.length > 0 ? (
            <Products products={products} />
          ) : (
            <Box>
              {" "}
              <Typography>No items</Typography>{" "}
            </Box>
          )}

          {products.length == 0 && (
            <Box
              sx={{ display: "grid", placeContent: "center", height: "20rem" }}
            >
              <CircularProgress />
            </Box>
          )}

          {values.searchBox == ""
            ? filteredProducts.length > 0 &&
              products.length < allProducts.length && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleLoadMoreProducts();
                  }}
                  sx={{ marginTop: "2rem" }}
                >
                  More
                </Button>
              )
            : filteredProducts.length > 0 &&
              products.length < filteredProducts.length && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleLoadMoreProducts();
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
