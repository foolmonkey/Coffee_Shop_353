import React, { useState } from "react";
import Axios from "axios";

function Account() {
  const [userRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [accountData, setAccountData] = useState(null);

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: userRegister,
        password: passwordRegister,
      },
      withCredentials: true,
      url: "http://localhost:80/register",
    }).then((res) => console.log(res));
  };

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: userLogin,
        password: passwordLogin,
      },
      withCredentials: true,
      url: "http://localhost:80/login",
    }).then((res) => console.log(res));
  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/user",
    }).then((res) => {
      setAccountData(res.data);
      console.log(res);
    });
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="Username"
          onChange={(e) => setUsernameRegister(e.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPasswordRegister(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="Username"
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPasswordLogin(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {accountData ? <h1>Welcome Back {accountData.Username}</h1> : null}
      </div>
    </div>
  );
}

export default Account;
