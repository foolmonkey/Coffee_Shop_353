import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main className="homepage">
      <h1>Welcome to Cloud Cafe!</h1>

      <div className="hero">
        <Link to="/Menu" className="viewMenu">
          View Menu
        </Link>
      </div>
    </main>
  );
};

export default Home;
