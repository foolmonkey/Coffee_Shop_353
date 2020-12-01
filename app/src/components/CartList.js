import React from "react";
import Item from "./Item";

function CartList({ getCart, setCart, cartLength, setCartLength }) {
  return (
    <div className="cartList">
      {getCart.map((item, i) => {
        return (
          <div key={i}>
            <Item
              item={item[0]}
              itemQuantity={item[1]}
              getCart={getCart}
              setCart={setCart}
              cartLength={cartLength}
              setCartLength={setCartLength}
              cartPage={true}
            ></Item>
          </div>
        );
      })}
    </div>
  );
}

export default CartList;
