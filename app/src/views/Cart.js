import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";

const Cart = ({ getCart, setCart, cartLength, setCartLength }) => {
  const CartContainer = () => {
    if (cartLength < 1) {
      return (
        <div className="cart">
          <p>Your cart is empty.</p>
          <Link to="/menu">Continue Shopping</Link>
        </div>
      );
    } else {
      return (
        <CartList
          getCart={getCart}
          setCart={setCart}
          cartLength={cartLength}
          setCartLength={setCartLength}
        ></CartList>
      );
    }
  };

  return (
    <main>
      <h1>Cart</h1>
      <CartContainer></CartContainer>
    </main>
  );
};

export default Cart;
