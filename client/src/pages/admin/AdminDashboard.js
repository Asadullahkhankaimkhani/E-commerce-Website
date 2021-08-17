import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductByCount } from "../../functions/product";
const AdminDashboard = () => {
  const [product, setPorduct] = useState([]);
  const [loading, setLoadin] = useState(false);

  useEffect(() => {
    getProductByCount(100)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <AdminNav />
          </div>
          <div className="col">Admin Dashboard</div>
        </div>
      </div>{" "}
    </>
  );
};

export default AdminDashboard;
