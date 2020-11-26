import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header>
      <nav>
        <div>
          <Link to="/" className="home">
            <i className="fas fa-cloud"></i>
            <p>Cloud Cafe</p>
          </Link>
        </div>
        <div>
          <Link to="/menu" className="menuButton">
            <p>Menu</p>
          </Link>
          <Link to="/about" className="aboutButton">
            <p>About</p>
          </Link>
          <Link to="/account" className="accounButton">
            <p>Account</p>
          </Link>
          <Link to="/cart" className="cartButton">
            <i className="fas fa-shopping-cart"></i>
            <p>{props.cartLength}</p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
