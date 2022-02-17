import React from "react";
import { Typography, Container, Box } from "@mui/material";

function Header({ productsShown, productsQty }) {
  return (
    <Box
      component={"header"}
      className="header"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        borderBottom: "1px solid #d5d5d5",
        width: "calc(100% - 25rem)",
        position: "fixed",
        zIndex: "999",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        boxShadow: 3,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{}}>
          Products List
        </Typography>
        <Typography sx={{}}>
          {productsQty > 0
            ? `${productsShown}/${productsQty} products`
            : "0 product"}
          {/* {values.searchBox == "" || filteredProducts.length > 0
            ? `${products.length}/${
                filteredProducts.length == 0
                  ? allProducts.length
                  : filteredProducts.length
              } product(s)`
            : "0 product"} */}
        </Typography>
      </Container>
    </Box>
  );
}

export default Header;
