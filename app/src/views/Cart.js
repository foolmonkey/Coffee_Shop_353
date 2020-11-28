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
        <div>
          <CartList
            getCart={getCart}
            setCart={setCart}
            cartLength={cartLength}
            setCartLength={setCartLength}
          ></CartList>

          <button type="button">
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
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
