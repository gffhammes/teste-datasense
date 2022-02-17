import React, { useContext } from "react";
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
import { ApiContext } from "../contexts/ApiContext";
import CartItem from "./CartItem";

function Cart({}) {
  const { cartItems, allProducts, clearCart, removeItem } =
    useContext(ApiContext);

  return (
    <Box
      className="cart"
      sx={{
        height: "100%",
        width: "100%",
        bottom: "0",
        right: "0",
        padding: "2rem",
        backgroundColor: "#115293",
        color: "#fff",
        zIndex: "1000",
      }}
    >
      <Typography variant="h4">Cart</Typography>
      <Box sx={{ display: "grid", rowGap: ".5rem" }}>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => {
            return (
              <CartItem
                removeItem={removeItem}
                cartItem={cartItem}
                key={cartItem.id}
                product={allProducts.filter((product) => {
                  if (product.id === cartItem.id) {
                    return true;
                  } else {
                    return false;
                  }
                })}
              />
            );
          })
        ) : (
          <Typography variant="span">No items</Typography>
        )}
      </Box>
      <Button onClick={clearCart}>Clear</Button>
    </Box>
  );
}

export default Cart;
