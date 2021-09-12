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
    console.log(data);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <UserNav />
        </div>
        <div className="col">User Page</div>
      </div>
    </div>
  );
};

export default History;
