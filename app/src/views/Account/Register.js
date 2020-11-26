import React, { useState } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

function Register({ getUser, accountData, setAccountData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const registerAuthentication = () => {
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:80/register",
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="register">
      {accountData ? (
        <Redirect to="/account" />
      ) : (
        <div>
          <div>
            <Link to="/login">Back</Link>
          </div>

          <h2>Register</h2>
          <p>Create an account to get started!</p>

          <form>
            <input
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
            />

            <input
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
            />

            <input
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength="10"
              type="text"
            />

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

            <button onClick={registerAuthentication} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
