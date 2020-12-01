import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";

const Cart = ({ getCart, setCart, cartLength, setCartLength }) => {
  const CartContainer = () => {
    if (cartLength < 1) {
      return (
        <div className="cartEmpty">
          <p>Your cart is empty.</p>
          <Link to="/menu">
            <button>Continue Shopping</button>
          </Link>
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

          <div className="checkout">
            <Link to="/checkout">
              <button type="button"> Checkout </button>
            </Link>
          </div>
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
