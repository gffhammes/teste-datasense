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
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import axios from "axios";

let productsDataQty = 4;

const truncate = (input, reqLength) =>
  input.length > reqLength ? `${input.substring(0, reqLength)}...` : input;

function App() {
  const [productsQty, setProductsQty] = useState(0);
  const [products, setProducts] = useState([]);

  const loadMoreProducts = () => {
    productsDataQty &&
      axios
        .get(`https://fakestoreapi.com/products?limit=${productsDataQty}`)
        .then(({ data }) => {
          const newProducts = [];
          data &&
            data.forEach((product) => {
              newProducts.push(product);
            });
          setProducts(newProducts);
        });
    productsDataQty += 4;
    console.log(products);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  // fetch("https://fakestoreapi.com/products?limit=5")
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => setProductsQty(json.length));

  // console.log(productsQty);

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
          <Typography>{productsQty} products</Typography>
          <Grid container spacing={2}>
            {products.map((product) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  {" "}
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
                        <Button size="small">+ cart</Button>
                        <Button size="small">VIEW</Button>
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {productsDataQty <= productsQty && (
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

export default App;
