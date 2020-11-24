import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList";

const Menu = (props) => {
  return (
    <main>
      <h1>Menu</h1>

      <ItemList data={props.data} setCart={props.setCart}></ItemList>
    </main>
  );
};

export default Menu;
