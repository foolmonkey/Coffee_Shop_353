import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header>
      <nav>
        <div>
          <NavLink to="/" className="home">
            <i className="fas fa-cloud"></i>
            <p>Cloud Cafe</p>
          </NavLink>

          <NavLink
            to="/menu"
            activeClassName="navActive"
            className="menuButton"
          >
            <p>Menu</p>
          </NavLink>
          <NavLink
            to="/about"
            activeClassName="navActive"
            className="aboutButton"
          >
            <p>About</p>
          </NavLink>
          <NavLink
            to="/account"
            activeClassName="navActive"
            className="accounButton"
          >
            <p>Account</p>
          </NavLink>
        </div>

        <NavLink to="/cart" activeClassName="cartActive" className="cartButton">
          <div>
            <i className="fas fa-shopping-cart"></i>
            <p>{props.cartLength > 0 ? props.cartLength : 0}</p>
          </div>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
