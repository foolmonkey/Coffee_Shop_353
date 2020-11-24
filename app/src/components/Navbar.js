import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header>
      <nav>
        <Link to="/" className="home">
          <p>Cloud Cafe</p>
        </Link>
        <Link to="/menu" className="menuButton">
          <p>Menu</p>
        </Link>
        <Link to="/about" className="aboutButton">
          <p>About</p>
        </Link>
        <Link to="/cart" className="cartButton">
          <p>Cart</p>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
