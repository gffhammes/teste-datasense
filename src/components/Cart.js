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
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";

function Cart({}) {
  const { cartItems } = useContext(CartContext);

  return (
    <Box
      sx={{
        position: "fixed",
        height: "100%",
        width: "20rem",
        bottom: "0",
        right: "0",
        padding: "2rem",
        backgroundColor: "#115293",
        color: "#fff",
        zIndex: "1000",
      }}
    >
      <Typography variant="h4">Cart</Typography>
      {cartItems.map((cartItem) => {
        return <CartItem cartItem={cartItem} key={cartItem.id} />;
      })}
    </Box>
  );
}

export default Cart;
