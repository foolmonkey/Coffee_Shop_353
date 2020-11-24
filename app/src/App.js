import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// routes
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Cart from "./views/Cart";
import Account from "./views/Account";
import About from "./views/About";
import NoMatch from "./views/NoMatch";

function App() {
  const [getMenu, setMenu] = useState([]);
  const [getCart, setCart] = useState([]);

  // fetches from api
  async function fetchMenu() {
    await fetch("http://localhost:80/menu/")
      .then((response) => response.json())
      .then((response) => setMenu(response))
      .catch((err) => console.error(err));
  }

  if (getMenu.length < 1) {
    setTimeout(() => {
      fetchMenu();
    }, 500);
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route
          path="/menu"
          render={(props) => (
            <Menu {...props} data={getMenu} setCart={setCart} />
          )}
        />

        <Route path="/about" render={(props) => <About />} />

        <Route path="/account" render={(props) => <Account />} />

        <Route
          path="/cart"
          render={(props) => (
            <Menu {...props} data={getCart} setCart={setCart} />
          )}
        />

        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
