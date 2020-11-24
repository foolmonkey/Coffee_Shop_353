import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main>
      <h1>Welcome to Cloud Cafe!</h1>

      <Link to="/Menu">View Menu</Link>
    </main>
  );
};

export default Home;
