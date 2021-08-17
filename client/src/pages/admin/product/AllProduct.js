import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import AdminNav from "../../../components/nav/AdminNav";
import { getProductByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProduct = () => {
  const [products, setPorduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProduct = () => {
    setLoading(true);
    getProductByCount(100)
      .then((res) => {
        setPorduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            {loading ? <LoadingOutlined /> : <h4>Products</h4>}
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-=4">
                  <AdminProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default AllProduct;
