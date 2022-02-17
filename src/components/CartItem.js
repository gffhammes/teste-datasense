import React from "react";

function CartItem({ cartItem }) {
  return <div>{cartItem.id} -- {cartItem.qty}</div>;
}

export default CartItem;
