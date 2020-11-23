import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import "./styles.css";

function App() {
  const [getMenu, setMenu] = useState([]);

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
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        {/* <Route
          path="/detail/:name"
          render={(props) => (
            <CountryDetail {...props} countriesData={countriesData} />
          )}
        />

        <Route component={NoMatch} /> */}
      </Switch>
    </div>
  );
}

export default App;
