import React, { useState } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

function Register({
  getUser,
  accountData,
  setAccountData,
  registerAccount,
  login,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const createCustomer = async () => {
    await Axios({
      method: "POST",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      withCredentials: true,
      url: "http://localhost:80/customer/insert",
    }).then((res) => {
      console.log(res.data);
    });
  };

  const handleRegister = () => {
    registerAccount(username, password, firstName, lastName, email);
  };

  return (
    <div className="register">
      {accountData ? (
        <Redirect to="/account" />
      ) : (
        <div>
          <div>
            <Link to="/account/login">Back</Link>
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

            <button onClick={handleRegister}>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
