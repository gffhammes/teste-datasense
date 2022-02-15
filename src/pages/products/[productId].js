import React from "react";
import { useParams } from "react-router-dom";

function ProductId() {
  let params = useParams();
  return <div>{params.productId}</div>;
}

export default ProductId;
