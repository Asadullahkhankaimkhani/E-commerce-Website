import React, { useEffect, useState } from "react";
import { getProductByCount } from "../functions/product";

import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";

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
      <div className="jumbotron text-center text-danger h1 font-weight-bold ">
        <Jumbotron text={["Latest Product", "New Arrival", "Best Selling"]} />
      </div>
      <div className="container">
        {loading ? (
          <LoadingCard cardCount={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
