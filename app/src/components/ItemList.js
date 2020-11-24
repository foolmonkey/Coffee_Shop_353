import React from "react";
import Item from "./Item";

function ItemList({ data, setCart }) {
  return (
    <section id="itemList">
      {data.map((item, i) => {
        return (
          <Item
            key={i}
            name={item.Name}
            category={item.Category}
            price={item.Price}
            description={item.Description}
            picture={item.Picture}
            setCart={setCart}
          ></Item>
        );
      })}
    </section>
  );
}

export default ItemList;
