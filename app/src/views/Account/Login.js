import React, { useState } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

function Login({ getUser, accountData, setAccountData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:80/login",
    })
      .then((res) => console.log(res))
      .then(getUser);
  };

  return (
    <div>
      {accountData ? (
        <Redirect to="/account" />
      ) : (
        <div className="login">
          <div>My Account</div>
          <div>
            <h2>Returning Customer</h2>
            <p>Log into your account below.</p>
            <input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="7"
              maxLength="20"
              type="text"
            />

            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              minLength="7"
              maxLength="16"
              required
              type="password"
            />
            <button onClick={login}>Log In</button>
          </div>

          <div>
            <h1>New to Cloud Cafe?</h1>
            <p>Create an account with us!</p>
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
