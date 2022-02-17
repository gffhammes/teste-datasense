import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useWindowDimensions from "../hooks/useWindowDimensions";

function CartIconMobile({ color }) {
  const { width } = useWindowDimensions();
  const { cartItems, cartOpen, handleCartClick } = useContext(ApiContext);

  return (
    <>
      {width < 960 && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              backgroundColor: "white",
              color: "#1976d2",
              width: "fit-content",
              height: "fit-content",
              padding: ".25rem .5rem",
              borderRadius: "3rem",
            }}
          >
            {cartItems.length}
          </Typography>
          <IconButton
            onClick={() => {
              handleCartClick();
            }}
            color={color === "primary" ? "primary" : "secondary"}
            aria-label="shopping cart"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}

export default CartIconMobile;
