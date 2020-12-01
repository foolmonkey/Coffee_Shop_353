import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

const Checkout = ({ getCart, setCart, cartLength, setCartLength }) => {
  const [getSubtotal, setSubtotal] = useState(0);
  const [redirectAccount, setRedirectAccount] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const createOrder = async () => {
    for (let i = 0; i < getCart.length; i++) {
      let element = getCart[i];
      let itemsProcessed = 0;

      Axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:80/orders/insert",
        data: {
          itemName: `${element[0].ItemName}`,
          quantity: `${element[1]}`,
        },
      })
        .then((res) => {
          if (res.data === "/") {
            setRedirectAccount(true);
          } else if (res.data === "order created") {
            console.log(res);
            itemsProcessed++;
            console.log("items processed:", itemsProcessed);

            if (itemsProcessed > 0) {
              setCart([]);
              setCartLength([]);
              setOrderCompleted(true);
            }
          }
        })
        .catch((err) => {
          setRedirectAccount(true);
        });
    }
  };

  useEffect(() => {
    const calculateSubtotal = () => {
      let total = 0;
      if (getCart) {
        getCart.forEach((element) => {
          total += element[0].Price * element[1];
        });

        return total.toFixed(2);
      }
    };

    setSubtotal(calculateSubtotal());
  }, [getCart]);

  const calculateTotal = () => {
    return (
      Number.parseFloat(getSubtotal) +
      Number.parseFloat(getSubtotal) * (Number.parseFloat(11) / 100.0)
    ).toFixed(2);
  };

  return (
    <main className="checkoutPage">
      {orderCompleted ? <Redirect to="/completed"></Redirect> : null}
      {redirectAccount ? <Redirect to="/account"></Redirect> : null}
      <Link to="/cart" className="backToCart">
        <i className="fas fa-arrow-left"></i> Back to Cart
      </Link>

      <h1>Checkout</h1>

      <div className="cartList">
        <div>
          {getCart.map((item, i) => {
            return (
              <div key={i} className="item checkoutItem">
                <img
                  src={`/images/${item[0].ItemName}.jpg`}
                  alt="thumbnail"
                ></img>
                <div>
                  <p className="itemName">{item[0].ItemName}</p>
                  <p className="itemQuantity">Quantity: {item[1]}</p>
                  <p className="itemPrice">$ {item[0].Price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="cartInfo">
        <p>Contact Information</p>
      </div> */}

      <div className="cartTotal">
        <h3>Subtotal</h3>
        <p className="subtotalLabel">$ {getSubtotal}</p>
        <h2>Total</h2>
        <p className="totalLabel">$ {calculateTotal()}</p>

        <button onClick={createOrder} className="confirmOrder">
          Confirm Order
        </button>
      </div>
    </main>
  );
};

export default Checkout;
