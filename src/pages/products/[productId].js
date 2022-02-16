import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  Grid,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";

function ProductId(props) {
  let params = useParams();

  const [product, setProduct] = useState();

  const fetchProducts = () => {
    return axios
      .get(`https://fakestoreapi.com/products/${params.productId}`)
      .then((res) => {
        setProduct(res.data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);

  const theme = createTheme();

  theme.typography.h1 = {
    fontSize: "2.5rem",
    fontWeight: "normal",
  };

  return product ? (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: "3rem" }}>
        <Link to="/">&larr; Home</Link>
        <Card
          sx={{
            height: "100%",
            display: "flex",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ padding: "1rem", alignItems: "center" }}
          >
            <Grid item lg={6} sx={{ height: "fit-content" }}>
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", width: "100%", maxHeight: "40rem" }}
              />
            </Grid>
            <Grid item lg={6}>
              <CardContent sx={{ display: "grid", rowGap: "2rem" }}>
                <Typography variant="h1">{product.title}</Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="span"
                    sx={{
                      padding: ".25rem .5rem",
                      borderRadius: ".5rem",
                      border: "1px solid #adadad",
                      color: "#adadad",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.category.toUpperCase()}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "1rem",
                    }}
                  >
                    <Typography variant="h5" sx={{}}>
                      {product.rating.rate}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={product.rating.rate}
                      precision={0.1}
                      size="large"
                      sx={{ margin: "0 1rem 0 .5rem" }}
                      readOnly
                    />
                    <Typography
                      variant="span"
                      sx={{
                        padding: ".25rem .5rem",
                        borderRadius: ".5rem",
                        backgroundColor: "#d8d8d8",
                      }}
                    >
                      {product.rating.count}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    justifySelf: "center",
                    display: "flex",
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                    $
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      lineHeight: "1",
                    }}
                  >
                    {product.price}
                  </Typography>
                </Box>
                <Typography variant="span">{product.description}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </ThemeProvider>
  ) : (
    <div className="none"></div>
  );
}

export default ProductId;
