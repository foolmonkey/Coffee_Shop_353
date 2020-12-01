import React from "react";
import { Link } from "react-router-dom";

const About = (props) => {
  return (
    <main className="about">
      <div className="hero">
        <img src="/images/about.jpg"></img>
        <div>
          <h1>About Us</h1>
          <h2>
            We are Cloud Cafe, dedicated to providing you with quality
            ingredients, brews, and service!
          </h2>
        </div>
      </div>
    </main>
  );
};

export default About;
