import React from "react";

function Item({ name, category, description, price, picture, setCart }) {
  return (
    <div className="item">
      {picture != null && <img src={`"${picture}"`} alt="thumbnail"></img>}
      <p className="itemName">{name}</p>
      <p className="itemDescription">{description}</p>
      <p className="itemPrice">{price}</p>

      <div className="addToCart">
        <button type="button">ADD TO CART</button>
      </div>
    </div>
  );
}

export default Item;
