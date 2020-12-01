import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <footer>
      <p>Made with {"<3"} by Andy Tran!</p>

      <a href="https://github.com/foolmonkey/">
        <i class="fab fa-github"></i>
      </a>
    </footer>
  );
};

export default Footer;
