import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main className="homepage">
      <div className="hero">
        <img src="/images/home_hero.jpg"></img>
        <div>
          <h1>Cloud Cafe</h1>
          <h2>Providing the finest coffee and food in Downtown Regina!</h2>
          <Link to="/Menu" className="viewMenu">
            <button> View Menu</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
