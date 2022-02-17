import React, { useContext } from "react";
import ApiContext from "../contexts/ApiContext";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Box,
  Rating,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";

const truncate = (input, reqLength) =>
  input.length > reqLength ? `${input.substring(0, reqLength)}...` : input;

function ProductCard({ product, saveItem }) {
  return (
    <Grid item xs={12} sm={6} md={12} im={6} lg={4} xl={3}>
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
                ${product.price.toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="h5" component="div">
              {truncate(product.title, 50)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                saveItem(product);
              }}
            >
              + CART
            </Button>
            <Button
              size="small"
              component={Link}
              to={`/products/${product.id}`}
            >
              VIEW
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
}

export default ProductCard;
