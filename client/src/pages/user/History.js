import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const History = () => {
  const [orders, setOrders] = useState([]);

  // redux State
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await getUserOrders(user.token);
    setOrders(data);
    console.log(data);
  };

  const showOrderInTable = (order) => {
    //
  };

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div className="m-5 -3 card" key={i}>
        <p>show payment info</p>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>PDF download</p>
          </div>
        </div>
      </div>
    ));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {" "}
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
