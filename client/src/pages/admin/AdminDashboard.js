import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await getOrders(user.token);
    console.log(data);
  };

  const handleStatusChange = async (orderId, orderStatus) => {
    const { data } = changeStatus(orderId, orderStatus, user.token);
    toast.success("Status updated");
    loadOrders();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            <h1>Admin Page</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
