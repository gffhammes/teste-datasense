import React from "react";
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
} from "@mui/material";

const truncate = (input, reqLength) =>
  input.length > reqLength ? `${input.substring(0, reqLength)}...` : input;

function CartItem({ cartItem, product, removeItem }) {
  product = product[0];
  return (
    <Card
      sx={{ display: "grid", width: "100%", gridTemplateColumns: "1fr 2fr" }}
    >
      <Box sx={{ padding: "1rem", height: "9rem" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", height: "100%" }}
        />
      </Box>
      <Box>
        <CardContent sx={{ display: "grid", rowGap: ".5rem", padding: "1rem" }}>
          <Typography sx={{ fontSize: "1.2rem" }}>
            {truncate(product.title, 15)}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ justifySelf: "start" }}>
              ${product.price} x {cartItem.qty}
            </Typography>
            <Typography sx={{ fontWeight: "bold", justifySelf: "end" }}>
              ${(product.price * cartItem.qty).toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              removeItem(cartItem);
            }}
          >
            Remove
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default CartItem;
