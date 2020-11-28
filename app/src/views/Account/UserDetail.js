import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import OrdersList from "../../components/OrdersList";
import Axios from "axios";

function UserDetail() {
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);

  const getOpenOrders = async () => {
    return await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:80/orders/customer/open",
    }).then((res) => {
      localStorage.setItem("openOrders", JSON.stringify(res.data));
    });
  };

  const getClosedOrders = () => {
    return Axios({
      method: "GET",

      withCredentials: true,
      url: "http://localhost:80/orders/customer/closed",
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
  }, []);

  return (
    <div className="userdetail">
      <OrdersList ordersListData={openOrders}></OrdersList>

      <OrdersList ordersListData={closedOrders}></OrdersList>
    </div>
  );
}

export default UserDetail;
