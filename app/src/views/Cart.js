import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = ({ getCart, setCart }) => {
  const CartItems = () => {
    if (getCart.length === 0) {
      return (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/menu">Continue Shopping</Link>
        </div>
      );
    }
  };

  return (
    <main>
      <h1>Cart</h1>
      <CartItems></CartItems>
    </main>
  );
};

export default Cart;
