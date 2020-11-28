import React, { useState, useEffect, useCallback } from "react";

function Item({
  item,
  getCart,
  setCart,
  cartLength,
  setCartLength,
  cartPage,
  itemQuantity,
}) {
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = () => {
    let orderItem = [item, quantity];
    let cartCopy = getCart;

    if (cartLength > 0) {
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

      let len = Number.parseInt(cartLength) + Number.parseInt(quantity);
      setCartLength(len);
      localStorage.setItem("cartLength", len);
    } else {
      cartCopy.push(orderItem);
      setCartLength(quantity);
      localStorage.setItem("cartLength", quantity);
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

  const handleNumericalInput = (e) => {
    setQuantity(e.target.value.replace(/\D/, ""));
  };

  const handleCartQuantity = async (e) => {
    let quantityCopy = e.target.value.replace(/\D/, "");
    let cartCopy = [...getCart];
    cartCopy.map((items) => {
      cartCopy.find((ele) => ele[0] === item)[1] = Number.parseInt(
        quantityCopy
      );
      setCartLength(cartLength + Number.parseInt(quantityCopy - quantity));
    });

    setQuantity(quantityCopy);

    return cartCopy;
  };

  let handleCart = async (e) => {
    const copy = await handleCartQuantity(e);
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(getCart));
  };

  const CartControls = () => {
    return (
      <div className="itemControls">
        <label>
          Quantity
          <input
            type="text"
            min="1"
            max="100"
            value={quantity}
            onInput={(e) => handleCart(e)}
          ></input>
        </label>

        <button type="button" onClick={removeItemFromCart}>
          Remove
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (cartPage) {
      setQuantity(itemQuantity);
    } else {
      setQuantity(1);
    }
  }, []);

  return (
    <div className="item">
      <img src={`/images/${item.ItemName}.jpg`} alt="thumbnail"></img>
      <p className="itemName">{item.ItemName}</p>
      <p className="itemDescription">{item.Description}</p>
      <p className="itemPrice">{item.Price}</p>

      {!cartPage ? (
        <div className="itemControls">
          <label>
            Quantity
            <input
              type="text"
              min="1"
              max="100"
              value={quantity}
              onInput={(e) => handleNumericalInput(e)}
            ></input>
          </label>

          <button
            type="button"
            onClick={addItemToCart}
            className="addCartButton"
          >
            ADD TO CART
          </button>
        </div>
      ) : (
        <CartControls></CartControls>
      )}
    </div>
  );
}

export default Item;
