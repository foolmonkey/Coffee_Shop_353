import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Axios from "axios";

// routes
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Cart from "./views/Cart";
import Account from "./views/Account/Account";
import Login from "./views/Account/Login";
import Register from "./views/Account/Register";
import About from "./views/About";
import NoMatch from "./views/NoMatch";

function App() {
  const [getCategories, setCategories] = useState([]);
  const [getMenu, setMenu] = useState([]);
  const [getCart, setCart] = useState([]);
  const [accountData, setAccountData] = useState();

  async function fetchCategories() {
    await fetch("http://localhost:80/menu/categories")
      .then((response) => response.json())
      .then((response) => setCategories(response))
      .catch((err) => console.error(err));
  }

  async function fetchMenu() {
    await fetch("http://localhost:80/menu/")
      .then((response) => response.json())
      .then((response) => setMenu(response))
      .catch((err) => console.error(err));
  }

  const getUser = () => {
    if (localStorage.getItem("user") == null) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:80/user",
      }).then((res) => {
        setAccountData(res.data);
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      setAccountData(user);
    }
  };

  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/logout",
    }).then((res) => {
      console.log(res);
      setAccountData(null);
      localStorage.clear();
    });
  };

  if (getCategories.length < 1) {
    fetchCategories();
    fetchMenu();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Navbar getCart={getCart} />
      <Switch>
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route
          path="/menu"
          render={(props) => (
            <Menu
              {...props}
              data={getMenu}
              categories={getCategories}
              setCart={setCart}
            />
          )}
        />

        <Route path="/about" render={(props) => <About />} />

        <Route
          path="/account"
          render={(props) => (
            <Account
              {...props}
              accountData={accountData}
              setAccountData={setAccountData}
              logout={logout}
            />
          )}
        />

        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              accountData={accountData}
              setAccountData={setAccountData}
              getUser={getUser}
            />
          )}
        />

        <Route
          path="/register"
          render={(props) => (
            <Register
              {...props}
              accountData={accountData}
              setAccountData={setAccountData}
              getUser={getUser}
            />
          )}
        />

        <Route
          path="/cart"
          render={(props) => (
            <Cart {...props} getCart={getCart} setCart={setCart} />
          )}
        />

        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
