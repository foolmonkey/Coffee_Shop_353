import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";

function EditItem({ item, addItemButton }) {
  const [itemEdited, setItemEdited] = useState(false);
  const [itemName, setItemName] = useState(item.ItemName);
  const [itemDescription, setItemDescription] = useState(item.Description);
  const [itemCategory, setItemCategory] = useState(item.Category);
  const [itemPrice, setItemPrice] = useState(item.Price);

  const addItem = async () => {
    await Axios({
      method: "POST",
      data: {
        name: itemName,
        description: itemDescription,
        category: itemCategory,
        price: itemPrice,
      },
      withCredentials: true,
      url: "http://localhost:80/menu/insert",
    }).then((res) => {
      console.log(res.data);
    });
  };

  const removeItem = async () => {
    await Axios({
      method: "POST",
      data: {
        name: itemName,
      },
      withCredentials: true,
      url: "http://localhost:80/menu/delete",
    }).then((res) => {
      console.log(res.data);
    });
  };

  const handleDelete = () => {
    removeItem();
  };

  const editItem = async () => {
    await Axios({
      method: "POST",
      data: {
        newName: itemName,
        name: item.ItemName,
        description: itemDescription,
        category: itemCategory,
        price: itemPrice,
      },
      withCredentials: true,
      url: "http://localhost:80/menu/update",
    })
      .then((res) => {
        console.log(res.data);
      })
      .then((res) => {});
  };

  // Scrambled eggs, hash browns, with a choice of sausage or bacon.
  return (
    <div className="item editItem">
      <img src={`/images/${itemName}.jpg`} alt="thumbnail"></img>
      <form>
        <input
          className="itemName"
          defaultValue={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          required
        ></input>
        <input
          className="itemCategory"
          defaultValue={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
          placeholder="Category"
          required
        ></input>
        <textarea
          className="itemDescription"
          defaultValue={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <input
          className="itemPrice"
          defaultValue={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Price"
          required
        ></input>
        {!addItemButton ? (
          <>
            <button onClick={editItem}>Save Changes</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <button onClick={addItem}>Add Item</button>
        )}
      </form>
    </div>
  );
}

export default EditItem;
