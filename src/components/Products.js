import React from "react";
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
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const truncate = (input, reqLength) =>
  input.length > reqLength ? `${input.substring(0, reqLength)}...` : input;

function Products({ products }) {
  return (
    <Box>
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
                        <Rating
                          name="read-only"
                          value={product.rating.rate}
                          precision={0.5}
                          readOnly
                        />
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
                      <Button size="small">
                        <Link to={`/products/${product.id}`}>VIEW</Link>
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Outlet />
    </Box>
  );
}

export default Products;
