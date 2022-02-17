import React, { useContext } from "react";
import { Typography, Container, Box, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { ApiContext } from "../contexts/ApiContext";

function Header({ productsShown, productsQty }) {
  const { width } = useWindowDimensions();
  const { cartItems, cartOpen, handleCartClick } = useContext(ApiContext);

  return (
    <Box
      component={"header"}
      className="header"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        borderBottom: "1px solid #d5d5d5",
        width: "100%",
        zIndex: "999",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        boxShadow: 3,
      }}
    >
      <Container
        sx={{
          display: "grid",
          gridTemplateAreas: {
            xs: `"a c" 
          "b c"`,
            md: `"a b"`,
          },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ gridArea: "a" }}>
          Products List
        </Typography>
        <Typography sx={{ gridArea: "b" }}>
          {productsQty > 0
            ? `${productsShown}/${productsQty} products`
            : "0 product"}
        </Typography>
        {width < 960 && (
          <Box sx={{ display: "flex", alignItems: "center", gridArea: "c" }}>
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
              color="secondary"
              aria-label="shopping cart"
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Header;
