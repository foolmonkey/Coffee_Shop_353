import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Axios from "axios";

function OrdersList({ ordersListData, isEmployee }) {
  const getOrderStatusMessages = (orderStatus) => {
    let orderStatusMessages = [
      "Confirming Your Order",
      "Order Confirmed",
      "Preparing",
      "Ready For Pickup",
      "Completed",
      "Cancelled",
    ];
    if (isEmployee) {
      orderStatusMessages = [
        "UNCONFIRMED",
        "CONFIRMED",
        "PREPARING",
        "READY FOR PICKUP",
        "COMPLETED",
        "CANCELLED",
      ];
    }
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
      setOrderStatus(5);
    };

    let handleOrderStatusNext = () => {
      setOrderStatusNext(item);
      setOrderStatus(orderStatus + 1);
    };

    if (isEmployee && orderStatus < 4) {
      return (
        <button
          onClick={handleOrderStatusNext}
          className={"statusEmployee" + orderStatus}
        >
          MARK AS {getOrderStatusMessages(orderStatus + 1)}
        </button>
      );
    } else if (!isEmployee && orderStatus < 1) {
      return <button onClick={handleCancel}>Cancel Order</button>;
    } else if (!isEmployee && orderStatus === 5) {
      return (
        <button disabled className="cancelled">
          Cancelled Order
        </button>
      );
    } else {
      return null;
    }
  };

  if (ordersListData.length) {
    return (
      <section className="ordersSection">
        <div className="title">
          <h2>
            {ordersListData[0].OrderStatus < 4 ? "Open" : "Completed"} Orders
          </h2>
          <p>
            {ordersListData.length} order
            {ordersListData.length !== 1 ? "s " : " "}
            {ordersListData[0].OrderStatus < 4 ? "remaining." : "completed."}
          </p>
        </div>

        <div className="ordersList">
          {ordersListData.map((item, i) => {
            return (
              <div className="orderItem" key={i}>
                <img src={`/images/${item.ItemName}.jpg`} alt="thumbnail"></img>
                <div className="container">
                  {!isEmployee ? (
                    <p className={"orderItemStatus status" + item.OrderStatus}>
                      {getOrderStatusMessages(item.OrderStatus)}
                    </p>
                  ) : (
                    <>
                      <p className="orderCustomerID">
                        Customer ID: {item.CustomerID}
                      </p>
                      <p></p>
                    </>
                  )}

                  <p className="orderItemName">
                    {item.Quantity} {item.ItemName}
                    {item.Quantity > 1 ? "s" : null}
                  </p>
                  <p className="orderItemCreated">
                    Ordered on {new Date(item.OrderCreated).toLocaleString()}
                  </p>

                  {item.OrderCompleted ||
                  getOrderStatusMessages(item.OrderStatus) === "CANCELLED" ? (
                    <p className="orderItemCompleted">
                      Completed at{" "}
                      {new Date(item.OrderCompleted).toLocaleTimeString()}
                    </p>
                  ) : (
                    <div>
                      <OrderButtons item={item}></OrderButtons>
                    </div>
                  )}
                </div>
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
