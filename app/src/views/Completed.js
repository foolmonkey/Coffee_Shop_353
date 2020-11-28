import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

const Completed = () => {
  return (
    <main className="completed">
      <div>Your pickup order has been processed!</div>

      <Link to="/account">View Order Status</Link>
    </main>
  );
};

export default Completed;
