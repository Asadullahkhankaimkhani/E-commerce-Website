import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductByCount, deleteProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProduct = () => {
  const [products, setPorduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (slug) => {
    const answer = window.confirm("Deleted");
    if (answer) {
      deleteProduct(slug, user.token)
        .then((res) => {
          loadProduct();
          toast.success(`${res.data.title} is deleted`);
        })
        .catch((error) => {
          if (error.response.status === 400) toast.error(error.response.data);
          console.log(error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? <LoadingOutlined /> : <h4>Product</h4>}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-4">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
