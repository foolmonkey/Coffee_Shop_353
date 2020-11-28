import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Axios from "axios";

function OrdersList({ ordersListData, isEmployee }) {
  const getOrderStatusMessages = (orderStatus) => {
    let orderStatusMessages = [
      "UNCONFIRMED",
      "CONFIRMED",
      "PREPARING",
      "COMPLETED",
      "CANCELLED",
    ];
    return orderStatusMessages[orderStatus];
  };

  const cancelOrder = (item) => {
    Axios({
      method: "POST",
      data: {
        orderID: item.OrderID,
        orderStatus: item.OrderStatus,
        itemName: item.ItemName,
        quantity: item.Quantity,
      },
      withCredentials: true,
      url: "http://localhost:80/orders/customer/cancel",
    }).then((res) => {
      // refresh all orders
      console.log(item);
    });
  };

  const setOrderStatusNext = async (item) => {
    return await Axios({
      method: "POST",
      data: {
        orderID: item.OrderID,
        username: item.CustomerID,
        orderStatus: item.OrderStatus,
        itemName: item.ItemName,
        quantity: item.Quantity,
      },
      withCredentials: true,
      url: "http://localhost:80/orders/update/next",
    }).then((res) => {
      // refresh all orders
      console.log(item);
    });
  };

  const OrderButtons = ({ item }) => {
    const [orderStatus, setOrderStatus] = useState(item.OrderStatus);

    let handleCancel = () => {
      cancelOrder(item);
      setOrderStatus(4);
    };

    let handleOrderStatusNext = () => {
      setOrderStatusNext(item);
      setOrderStatus(orderStatus + 1);
    };

    if (isEmployee && orderStatus < 3) {
      return (
        <button onClick={handleOrderStatusNext}>
          MARK AS {getOrderStatusMessages(orderStatus + 1)}
        </button>
      );
    } else if (!isEmployee && orderStatus < 1) {
      return <button onClick={handleCancel}>Cancel Order</button>;
    } else if (!isEmployee && orderStatus === 4) {
      return <button disabled>Cancelled Order</button>;
    } else {
      return null;
    }
  };

  if (ordersListData.length) {
    return (
      <section className="ordersSection">
        <div className="title">
          <h2>
            {ordersListData[0].OrderStatus < 3 ? "Open" : "Completed"} Orders
          </h2>
          <p>
            {ordersListData.length} order
            {ordersListData.length !== 1 ? "s " : " "}
            {ordersListData[0].OrderStatus < 3 ? "remaining." : "completed."}
          </p>
        </div>

        <div className="ordersList">
          {ordersListData.map((item, i) => {
            return (
              <div className="orderItem" key={i}>
                <p className="orderItemID">Customer ID: {item.CustomerID}</p>
                <p className="orderItemName">Item: {item.ItemName}</p>
                <p className="orderItemquantity">Quantity: {item.Quantity}</p>
                <p className="orderItemCreated">
                  Order Created: {new Date(item.OrderCreated).toLocaleString()}
                </p>
                {!isEmployee && item.OrderStatus !== 3 ? (
                  <p className="orderItemStatus">
                    Status: {getOrderStatusMessages(item.OrderStatus)}
                  </p>
                ) : null}

                {item.OrderCompleted ||
                getOrderStatusMessages(item.OrderStatus) === "CANCELLED" ? (
                  <p>
                    Order Completed:{" "}
                    {new Date(item.OrderCompleted).toLocaleString()}
                  </p>
                ) : (
                  <OrderButtons item={item}></OrderButtons>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return null;
  }
}

export default OrdersList;
