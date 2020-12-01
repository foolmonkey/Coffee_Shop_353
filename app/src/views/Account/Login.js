import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

function Login({ getUser, accountData, setAccountData, getEmployees, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = () => {
    login(username, password);
    setLoginMessage(localStorage.getItem("loginMessage"));
  };

  useEffect(() => {
    setLoginMessage(localStorage.getItem("loginMessage"));
  }, [loginMessage]);

  return (
    <main>
      {accountData ? (
        <Redirect to="/account" />
      ) : (
        <div className="login">
          <h1>My Account</h1>
          <div>
            <section>
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

              {loginMessage ? <p>{loginMessage}</p> : null}
              <button onClick={handleLogin}>Log In</button>
            </section>

            <section className="register">
              <h2>New to Cloud Cafe?</h2>
              <p>Create an account with us!</p>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}

export default Login;
