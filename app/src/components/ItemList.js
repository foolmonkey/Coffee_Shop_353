import React from "react";
import Item from "./Item";

function ItemList({ data, category, setCart }) {
  return (
    <section id="itemList">
      {data
        .filter((data) => data.Category.includes(category))
        .map((item, i) => {
          return (
            <Item
              key={i}
              name={item.ItemName}
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
