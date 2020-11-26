import React from "react";
import Item from "./Item";

function ItemList({
  data,
  category,
  getCart,
  setCart,
  cartLength,
  setCartLength,
}) {
  return (
    <section id="itemList">
      {data
        .filter((data) => data.Category.includes(category))
        .map((item, i) => {
          return (
            <Item
              key={i}
              item={item}
              getCart={getCart}
              setCart={setCart}
              cartLength={cartLength}
              setCartLength={setCartLength}
            ></Item>
          );
        })}
    </section>
  );
}

export default ItemList;
