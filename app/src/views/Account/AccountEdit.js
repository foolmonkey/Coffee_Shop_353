import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Cart = ({ getCart, setCart, cartLength, setCartLength }) => {
  const setUserInformation = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/",
    }).then((res) => {});
  };

  return (
    <main>
      <h1>Edit Account</h1>
    </main>
  );
};

export default Cart;
