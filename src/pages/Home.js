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
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

let offset = 0;

const truncate = (input, reqLength) =>
  input.length > reqLength ? `${input.substring(0, reqLength)}...` : input;

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    loadMoreProducts();
  }, [allProducts]);

  const fetchProducts = () => {
    const data = axios.get("https://fakestoreapi.com/products").then((res) => {
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

  const theme = createTheme();

  theme.typography.h1 = {
    fontSize: "2.5rem",
    "@media (min-width:600px)": {
      fontSize: "3.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "5rem",
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
        <Container>
          <Typography variant="h1">Products List</Typography>
          <Typography>
            {products.length}/{allProducts.length} products
          </Typography>
          <Grid container spacing={2}>
            {products &&
              products.map((product) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ padding: "1rem" }}>
                        <CardMedia
                          component="img"
                          height="240"
                          image={product.image}
                          alt={product.title}
                          sx={{ objectFit: "contain" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              color: "#8d8d8d",
                              marginBottom: "1rem",
                            }}
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                              variant="h5"
                              component="div"
                            >
                              <StarIcon sx={{ marginRight: ".25rem" }} />
                              {product.rating.rate}
                            </Typography>
                            <Typography variant="h5" component="div">
                              ${product.price}
                            </Typography>
                          </Box>
                          <Typography variant="h5" component="div">
                            {truncate(product.title, 50)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">+ CART</Button>
                          <Button href={`/products/${product.id}`} size="small">
                            VIEW
                          </Button>
                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <Outlet />
          {products.length == 0 && <CircularProgress />}
          {products.length < allProducts.length && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                loadMoreProducts();
              }}
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
