import React, { useContext, useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { ApiContext } from "../contexts/ApiContext";
import CartItem from "./CartItem";
import CloseIcon from "@mui/icons-material/Close";
import useWindowDimensions from "../hooks/useWindowDimensions";
import axios from "axios";

function Cart({}) {
  const { width } = useWindowDimensions();
  const {
    cartItems,
    allProducts,
    clearCart,
    removeItem,
    cartOpen,
    handleCartClick,
    getProductById,
  } = useContext(ApiContext);

  const totalPrice = () => {
    let pricesSum = 0;
    cartItems.map((cartItem) => {
      const itemTotalPrice =
        getProductById(cartItem.id)[0].price * cartItem.qty;
      pricesSum += itemTotalPrice;
    });
    return pricesSum.toFixed(2);
  };

  const [cartId, setCartId] = useState("");

  useEffect(() => {
    cartId && alert(`Checkout done successfully! Your cart id is ${cartId}`);
    setCartId(null);
  }, [cartId]);

  const checkout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return null;
    }

    const productsArray = [];

    cartItems.map((cartItem) => {
      const cartItemObj = {
        productId: cartItem.id,
        quantity: parseInt(cartItem.qty),
      };
      productsArray.push(cartItemObj);
    });

    const cart = JSON.stringify({
      userId: 5,
      date: Date.now(),
      products: productsArray,
    });
    axios
      .post("https://fakestoreapi.com/carts", cart)
      .then(
        (response) =>
          setCartId(response.data.id) /*setCheckoutId(response.data.id)*/
      );

    clearCart();
  };

  return (
    <Box
      className={`cart ${cartOpen && width < 960 ? "open" : ""}`}
      sx={{
        height: "100%",
        width: "100%",
        bottom: "0",
        right: "0",
        padding: "2rem",
        backgroundColor: "#115293",
        color: "#fff",
        zIndex: "1000",
        display: "grid",
        gridTemplateRows: "min-content auto min-content",
        rowGap: "2rem",
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Cart</Typography>
        {width < 960 && (
          <IconButton
            onClick={() => {
              handleCartClick();
            }}
            color="secondary"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "grid",
            rowGap: ".5rem",
            justifyItems: "center",
          }}
        >
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => {
              return (
                <CartItem
                  removeItem={removeItem}
                  cartItem={cartItem}
                  key={cartItem.id}
                  product={getProductById(cartItem.id)}
                />
              );
            })
          ) : (
            <Box
              sx={{
                background:
                  "linear-gradient(135deg,rgba(255, 255, 255,.2),rgba(255, 255, 255,.1))",
                color: "#fff",
                width: "100%",
                height: "6rem",
                borderRadius: ".25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="span">Empty</Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          rowGap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateAreas: `"a b"`,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">
            {cartItems.length} {cartItems.length > 1 ? "items" : "item"}
          </Typography>
          <Typography variant="h6">${totalPrice()}</Typography>
        </Box>
        <hr />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `1fr 1fr`,
            columnGap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Button color="secondary" onClick={clearCart}>
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              checkout();
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
