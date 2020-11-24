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
  const [getCategories, setCategories] = useState([]);
  const [getMenu, setMenu] = useState([]);
  const [getCart, setCart] = useState([]);

  // fetches from api
  async function fetchMenu() {
    // let items = [];
    // getCategories.forEach((element) => {
    //   fetch(`http://localhost:80/menu/categories/"${element.Category}"`)
    //     .then((response) => response.json())
    //     .then((response) => items.push({ [element.Category]: response }))
    //     .catch((err) => console.error(err));
    // });
  }

  async function fetchCategories() {
    await fetch("http://localhost:80/menu/categories")
      .then((response) => response.json())
      .then((response) => setCategories(response))
      .catch((err) => console.error(err));
  }

  async function fetchWholeMenu() {
    await fetch("http://localhost:80/menu/")
      .then((response) => response.json())
      .then((response) => setMenu(response))
      .catch((err) => console.error(err));
  }

  if (getCategories.length < 1) {
    fetchCategories();
    fetchWholeMenu();
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
            <Menu
              {...props}
              data={getMenu}
              categories={getCategories}
              setCart={setCart}
            />
          )}
        />

        <Route path="/about" render={(props) => <About />} />

        <Route path="/account" render={(props) => <Account />} />

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
