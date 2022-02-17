import React from "react";
import { Grid, Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import ProductCard from "./ProductCard";

function Products({ products, saveItem }) {
  return (
    <Box>
      <Grid container spacing={2}>
        {products &&
          products.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                saveItem={saveItem}
              />
            );
          })}
      </Grid>
      <Outlet />
    </Box>
  );
}

export default Products;
