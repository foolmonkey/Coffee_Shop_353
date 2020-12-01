import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Axios from "axios";
import OrdersList from "../../components/OrdersList";

function EmployeeDetail() {
  const [openOrdersList, setOpenOrders] = useState([]);
  const [closedOrdersList, setClosedOrders] = useState([]);

  const getOpenOrders = async () => {
    return await Axios({
      method: "GET",

      withCredentials: true,
      url: "http://localhost:80/orders/open",
    }).then((res) => {
      localStorage.setItem("openOrders", JSON.stringify(res.data));
    });
  };

  const getClosedOrders = async () => {
    return await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/orders/closed",
    }).then((res) => {
      localStorage.setItem("closedOrders", JSON.stringify(res.data));
    });
  };

  useEffect(() => {
    getOpenOrders().then(() => {
      setOpenOrders(JSON.parse(localStorage.getItem("openOrders")));
    });

    getClosedOrders().then(() => {
      setClosedOrders(JSON.parse(localStorage.getItem("closedOrders")));
    });

    setInterval(() => {
      getOpenOrders().then(() => {
        setOpenOrders(JSON.parse(localStorage.getItem("openOrders")));
      });

      getClosedOrders().then(() => {
        setClosedOrders(JSON.parse(localStorage.getItem("closedOrders")));
      });
    }, 4000);
  }, []);

  return (
    <div className="employeedetail">
      <OrdersList
        ordersListData={openOrdersList}
        isEmployee={true}
      ></OrdersList>

      <OrdersList
        ordersListData={closedOrdersList}
        isEmployee={true}
      ></OrdersList>
    </div>
  );
}

export default EmployeeDetail;
