import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header>
      <nav>
        <Link to="/" className="home">
          <p>Cloud Cafe</p>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
