import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  createTheme,
  Grid,
  IconButton,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { Helmet } from "react-helmet";
import { ApiContext } from "../../contexts/ApiContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartIconMobile from "../../components/CartIconMobile";

function ProductId(props) {
  let params = useParams();

  const { saveItem, allProducts, getProductById, isLoading, handleCartClick } =
    useContext(ApiContext);

  const [product, setProduct] = useState();

  useEffect(() => {
    const thisProduct = getProductById(parseInt(params.productId));

    setProduct(thisProduct);
  }, []);

  useEffect(() => {
    const thisProduct = getProductById(parseInt(params.productId));

    setProduct(thisProduct[0]);
  }, [allProducts]);

  const theme = createTheme({
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
    fontSize: "2.5rem",
    fontWeight: "normal",
  };

  return (
    <>
      <Helmet>
        <title>{product !== undefined ? product.title : "Not found"}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <Box
          component={"header"}
          sx={{
            borderBottom: "1px solid #d5d5d5",
            width: "100%",
            zIndex: "999",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Container
            sx={{
              display: "grid",
              justifyContent: "space-between",
              gridTemplateColumns: "auto auto",
            }}
          >
            <Button component={Link} to="/">
              &larr; Home
            </Button>
            <CartIconMobile color={"primary"} />
          </Container>
        </Box>
        {product !== undefined ? (
          <Box>
            <Container sx={{ height: "100%", overflowY: "hidden" }}>
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
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={4}
                    xl={6}
                    sx={{ height: "fit-content" }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.title}
                      sx={{
                        padding: "2rem",
                        objectFit: "contain",
                        width: "100%",
                        maxHeight: { xs: "20rem", md: "40rem" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8} lg={6}>
                    <CardContent sx={{ display: "grid", rowGap: "2rem" }}>
                      <Typography
                        variant="h1"
                        sx={{ textAlign: { xs: "center", sm: "left" } }}
                      >
                        {product.title}
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          display: "grid",
                          alignItems: "center",
                          justifyContent: {
                            xs: "center",
                            sm: "space-between",
                          },
                          gridTemplateAreas: {
                            xs: `"a"
                  "b"
                  "c"`,
                            sm: `"a c"
                  "b c"`,
                          },
                          gap: { xs: "1.5rem", sm: "1rem" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gridArea: "a",
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
                        <Typography
                          variant="span"
                          sx={{
                            padding: ".25rem .5rem",
                            borderRadius: ".5rem",
                            border: "1px solid #adadad",
                            color: "#adadad",
                            whiteSpace: "nowrap",
                            gridArea: "b",
                            width: "fit-content",
                            justifySelf: { xs: "center", sm: "start" },
                          }}
                        >
                          {product.category.toUpperCase()}
                        </Typography>
                        <Box
                          sx={{
                            justifySelf: "center",
                            display: "flex",
                            gridArea: "c",
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
                      </Box>
                      <Typography variant="span">
                        {product.description}
                      </Typography>
                      <Box>
                        <Button
                          variant="contained"
                          onClick={() => {
                            saveItem(product);
                          }}
                        >
                          + Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </Box>
        ) : (
          <Container
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="not-found"
          >
            Not found
          </Container>
        )}
      </ThemeProvider>
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
    </>
  );
}

export default ProductId;
