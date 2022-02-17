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
  createMuiTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import Products from "../components/Products";
import Header from "../components/Header";
import { ApiContext } from "../contexts/ApiContext";
import { Helmet } from "react-helmet";

let offset;

function Home() {
  const { allProducts, isLoading } = useContext(ApiContext);
  // const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [values, setValues] = useState({
    searchBox: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    offset = 0;
    // fetchProducts();
  }, []);

  // const fetchProducts = () => {
  //   return axios.get("https://fakestoreapi.com/products").then((res) => {
  //     setAllProducts(res.data);
  //   });
  // };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    offset = 0;
    if (
      values.searchBox === "" &&
      values.minPrice === "" &&
      values.maxPrice === ""
    ) {
      loadMoreProducts(allProducts);
    } else {
      loadMoreProducts(filteredProducts);
    }
  }, [allProducts]);

  const handleLoadMoreProducts = () => {
    isFilterEmpty()
      ? loadMoreProducts(allProducts)
      : loadMoreProducts(filteredProducts);
  };

  useEffect(() => {
    handleFilterChange();
  }, [values]);

  useEffect(() => {
    offset = 0;
    if (
      values.searchBox === "" &&
      values.minPrice === "" &&
      values.maxPrice === "" &&
      filteredProducts.length == 0
    ) {
      return null;
    }

    if (
      values.searchBox === "" &&
      values.minPrice === "" &&
      values.maxPrice === "" &&
      filteredProducts.length === allProducts.length
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
          (values.searchBox !== ""
            ? product.title
                .toLowerCase()
                .includes(values.searchBox.toLowerCase())
            : true) &&
          (values.minPrice !== "" ? product.price >= values.minPrice : true) &&
          (values.maxPrice !== "" ? product.price <= values.maxPrice : true)
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  const loadMoreProducts = (products) => {
    if (products.length == 0) return null;
    const newProducts = [];
    products.slice(0, offset + 4).forEach((product) => {
      newProducts.push(product);
    });
    setProducts(newProducts);
    offset += 4;
  };

  const isFilterEmpty = () => {
    return (
      values.searchBox === "" &&
      values.minPrice === "" &&
      values.maxPrice === ""
    );
  };

  const { saveItem } = useContext(ApiContext);

  return (
    <Box
      className="products"
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <Header
        productsShown={products.length}
        productsQty={
          isFilterEmpty() ? allProducts.length : filteredProducts.length
        }
      />

      <Box className="products-container">
        <Container sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <Box
            sx={{
              width: "100%",
              marginBottom: "4rem",
              display: "grid",
              gap: "1rem",
              gridTemplateAreas: {
                xs: `"a a"
                "b c"`,
                sm: `"a b c"`,
              },
              gridTemplateColumns: { xs: "1fr 1fr", sm: "2fr 1fr 1fr" },
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
                type="number"
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
                type="number"
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

          {isFilterEmpty() || filteredProducts.length > 0 ? (
            <Products products={products} saveItem={saveItem} />
          ) : (
            <Box>
              <Typography>No items</Typography>
            </Box>
          )}

          {isLoading && (
            <Box
              sx={{
                display: "grid",
                placeContent: "center",
                height: "20rem",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {isFilterEmpty()
            ? products.length < allProducts.length && (
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
    </Box>
  );
}

export default Home;
