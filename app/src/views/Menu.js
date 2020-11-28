import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList";

const Menu = (props) => {
  const Category = () => {
    return props.categories.map((item, i) => {
      return (
        <section className={item.Category} key={i}>
          <h2>{item.Category}</h2>
          <ItemList
            data={props.data}
            category={item.Category}
            getCart={props.getCart}
            setCart={props.setCart}
            cartLength={props.cartLength}
            setCartLength={props.setCartLength}
          ></ItemList>
        </section>
      );
    });
  };

  return (
    <main className="menu">
      <h1>Menu</h1>
      <div className="categories">
        <Category></Category>
      </div>
    </main>
  );
};

export default Menu;
