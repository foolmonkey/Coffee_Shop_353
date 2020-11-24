import React from "react";
import Item from "./Item";

function ItemList({ data, setCart }) {
  return (
    <section id="itemList">
      {data.map((item, i) => {
        return (
          <Item
            key={i}
            name={item.name}
            category={item.category}
            price={item.price}
            description={item.description}
            picture={item.picture}
            setCart={setCart}
          ></Item>
        );
      })}
    </section>
  );
}

export default ItemList;
