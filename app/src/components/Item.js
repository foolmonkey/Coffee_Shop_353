import React, { useState, useEffect } from "react";

function Item({ item, getCart, setCart, cartLength, setCartLength, cartPage }) {
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = () => {
    let orderItem = [item, quantity];
    let cartCopy = getCart;

    if (cartLength > 0) {
      console.log("hi");
      let foundInCart = false;

      for (let i = 0; i < cartCopy.length; i++) {
        if (cartCopy[i][0] === item) {
          cartCopy[i][1] =
            Number.parseInt(cartCopy[i][1]) + Number.parseInt(quantity);
          foundInCart = true;
          break;
        }
      }

      if (!foundInCart) {
        cartCopy.push(orderItem);
      }

      setCartLength(cartLength + quantity);
      localStorage.setItem("cartLength", cartLength + quantity);
    } else {
      cartCopy.push(orderItem);
      setCartLength(quantity);
      localStorage.setItem("cartLength", quantity);
      console.log("hix");
    }

    setCart(cartCopy);
    localStorage.setItem("cart", JSON.stringify(getCart));
  };

  const removeItemFromCart = () => {
    let cartCopy = getCart;
    let newLength = cartLength;
    for (let i = 0; i < cartCopy.length; i++) {
      if (cartCopy[i][0] === item) {
        newLength = cartLength - cartCopy[i][1];
        setCartLength(newLength);
        cartCopy.splice(i, 1);
        break;
      }
    }
    setCart(cartCopy);

    localStorage.setItem("cart", JSON.stringify(cartCopy));
    localStorage.setItem("cartLength", newLength);
  };

  const ItemComponents = () => {
    if (!cartPage) {
      return (
        <div>
          <p>Quantity</p>
          <input
            type="number"
            min="1"
            max="100"
            defaultValue="1"
            onChange={(e) => setQuantity(e.target.value)}
          ></input>

          <button
            type="button"
            onClick={addItemToCart}
            className="addCartButton"
          >
            ADD TO CART
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="number"
            min="1"
            max="100"
            // defaultValue={item[1]}
            // onChange={(e) => setQuantity(e.target.value)}
          ></input>

          <button type="button" onClick={removeItemFromCart}>
            Remove
          </button>
        </div>
      );
    }
  };

  return (
    <div className="item">
      <img src={`/images/${item.ItemName}.jpg`} alt="thumbnail"></img>
      <p className="itemName">{item.ItemName}</p>
      <p className="itemDescription">{item.Description}</p>
      <p className="itemPrice">{item.Price}</p>

      <div>
        <ItemComponents></ItemComponents>
      </div>
    </div>
  );
}

export default Item;
