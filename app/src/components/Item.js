import React from "react";

function Item({ name, category, description, price, picture, setCart }) {
  return (
    <div className="item">
      {picture != null && <img src={`"${picture}"`} alt="thumbnail"></img>}
      <p className="itemName">{name}</p>
      <p className="itemCategory">{category}</p>
      <p className="itemDescription">{description}</p>
      <p className="itemPrice">{price}</p>

      <div className="addToCart">
        <h1>{name}</h1>
        <button type="button">Add to Order</button>
      </div>
    </div>
  );
}

export default Item;
