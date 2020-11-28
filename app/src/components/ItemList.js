import React from "react";
import Item from "./Item";
import EditItem from "./EditItem";
import Axios from "axios";

function ItemList({
  data,
  category,
  getCart,
  setCart,
  cartLength,
  setCartLength,
}) {
  const AddItemContainer = (item) => {
    if (!localStorage.getItem("isEmployee")) {
      return null;
    } else {
      return (
        <EditItem
          item={item}
          getCart={getCart}
          setCart={setCart}
          cartLength={cartLength}
          setCartLength={setCartLength}
          addItemButton={true}
        ></EditItem>
      );
    }
  };

  const ItemController = ({ item, aKey }) => {
    if (!localStorage.getItem("isEmployee")) {
      return (
        <Item
          key={aKey}
          item={item}
          getCart={getCart}
          setCart={setCart}
          cartLength={cartLength}
          setCartLength={setCartLength}
        ></Item>
      );
    } else {
      return (
        <EditItem
          key={aKey}
          item={item}
          getCart={getCart}
          setCart={setCart}
          cartLength={cartLength}
          setCartLength={setCartLength}
        ></EditItem>
      );
    }
  };

  return (
    <section className="itemList">
      <AddItemContainer></AddItemContainer>

      {data
        .filter((data) => data.Category.includes(category))
        .map((item, i) => {
          return <ItemController item={item} aKey={i} key={i}></ItemController>;
        })}
    </section>
  );
}

export default ItemList;
