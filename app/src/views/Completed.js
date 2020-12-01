import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

const Completed = () => {
  return (
    <main className="completed">
      <div>
        <h1>Order Successful!</h1>
        <h2>Your pickup order has been processed!</h2>
      </div>

      <Link to="/account">
        <button className="viewOrderStatus">View Order Status</button>
      </Link>
    </main>
  );
};

export default Completed;
