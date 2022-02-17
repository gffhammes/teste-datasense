import React, { useContext } from "react";
import { Typography, Container, Box, Button, IconButton } from "@mui/material";
import CartIconMobile from "./CartIconMobile";

function Header({ productsShown, productsQty }) {
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
        <Box sx={{ gridArea: "c" }}>
          <CartIconMobile />
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
