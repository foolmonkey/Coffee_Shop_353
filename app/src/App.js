import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Axios from "axios";

// routes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Completed from "./views/Completed";

import Account from "./views/Account/Account";
import Login from "./views/Account/Login";
import Register from "./views/Account/Register";
import About from "./views/About";
import NoMatch from "./views/NoMatch";

function App() {
  const [getCategories, setCategories] = useState([]);
  const [getMenu, setMenu] = useState([]);
  const [getCart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [accountData, setAccountData] = useState();
  const [getOrders, setOrders] = useState([]);
  const [isEmployee, setIsEmployee] = useState(false);

  const fetchCategories = async () => {
    await fetch("http://localhost:80/menu/categories")
      .then((response) => response.json())
      .then((response) => setCategories(response))
      .catch((err) => console.error(err));
  };

  const fetchMenu = async () => {
    await fetch("http://localhost:80/menu/")
      .then((response) => response.json())
      .then((response) => setMenu(response))
      .catch((err) => console.error(err));
  };

  const getOrdersData = async () => {
    if (isEmployee) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:80/orders",
      })
        .then((res) => {
          setOrders(res.data);
          localStorage.setItem("orders", JSON.stringify(res.data));
        })
        .catch((err) => console.error(err));
    }
  };

  const getEmployees = async () => {
    localStorage.removeItem("isEmployee");

    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/employee",
    })
      .then((res) => {
        setIsEmployee(true);
        localStorage.setItem("isEmployee", true);
        getOrdersData();
      })
      .catch((err) => {});
  };

  const getUser = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/user",
    })
      .then((res) => {
        if (res.data) {
          setAccountData(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          getEmployees();
        }
      })
      .catch((err) => console.error(err));
  };

  const login = async (aUsername, aPassword) => {
    await Axios({
      method: "POST",
      data: {
        username: aUsername,
        password: aPassword,
      },
      withCredentials: true,
      url: "http://localhost:80/login",
    })
      .then((res) => {
        console.log(res.data);
      })
      .then((res) => getUser());
  };

  const logout = async () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/logout",
    })
      .then((res) => {
        setAccountData(null);
        setIsEmployee(false);
        setOrders([]);
        localStorage.removeItem("isEmployee");
        localStorage.removeItem("user");
        localStorage.removeItem("orders");
        localStorage.removeItem("openOrders");
        localStorage.removeItem("closedOrders");
      })
      .catch((err) => console.error(err));
  };

  const registerAccount = (
    aUsername,
    aPassword,
    aFirstName,
    aLastName,
    anEmail
  ) => {
    Axios({
      method: "POST",
      data: {
        username: aUsername,
        password: aPassword,
        firstName: aFirstName,
        lastName: aLastName,
        email: anEmail,
      },
      withCredentials: true,
      url: "http://localhost:80/register",
    }).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchMenu();
    getUser();
    if (localStorage.getItem("cart") && localStorage.getItem("cartLength")) {
      setCart(JSON.parse(localStorage.getItem("cart")));

      const cart = JSON.parse(localStorage.getItem("cart"));
      let quantity = 0;
      for (let i = 0; i < cart.length; i++) {
        quantity += cart[i][1];
      }

      setCartLength(quantity);
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        getCart={getCart}
        cartLength={cartLength}
        isEmployee={isEmployee}
      />
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
              getCart={getCart}
              setCart={setCart}
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          )}
        />

        <Route path="/about" render={(props) => <About />} />

        <Route
          exact
          path="/account"
          render={(props) => (
            <Account
              {...props}
              accountData={accountData}
              setAccountData={setAccountData}
              logout={logout}
              getEmployees={getEmployees}
              getOrders={getOrders}
              getOrdersData={getOrdersData}
              isEmployee={isEmployee}
            />
          )}
        />

        <Route
          path="/account/login"
          render={(props) => (
            <Login
              {...props}
              login={login}
              accountData={accountData}
              setAccountData={setAccountData}
              getUser={getUser}
              getEmployees={getEmployees}
            />
          )}
        />
        <Route exact path="/login">
          <Redirect to="/account/login" />
        </Route>

        <Route
          path="/account/register"
          render={(props) => (
            <Register
              {...props}
              login={login}
              accountData={accountData}
              setAccountData={setAccountData}
              getUser={getUser}
              registerAccount={registerAccount}
            />
          )}
        />
        <Route exact path="/register">
          <Redirect to="/account/register" />
        </Route>

        <Route
          path="/cart"
          render={(props) => (
            <Cart
              {...props}
              getCart={getCart}
              setCart={setCart}
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          )}
        />

        <Route path="/completed" render={(props) => <Completed {...props} />} />

        <Route
          path="/checkout"
          render={(props) => (
            <Checkout
              {...props}
              getCart={getCart}
              setCart={setCart}
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          )}
        />

        <Route component={NoMatch} />
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
