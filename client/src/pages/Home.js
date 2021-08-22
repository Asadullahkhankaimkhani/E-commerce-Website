import React, { useEffect, useState } from "react";
import { getProductByCount } from "../functions/product";
import { LoadingOutlined } from "@ant-design/icons";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadingProduct();
  }, []);

  const loadingProduct = async () => {
    setLoading(true);
    const { data } = await getProductByCount(3);
    setProducts(data);
    setLoading(false);
  };

  return (
    <>
      <div className="jumbotron text-center text-danger">
        {loading ? (
          <h1>
            <LoadingOutlined />
          </h1>
        ) : (
          <h1>All Product</h1>
        )}
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
