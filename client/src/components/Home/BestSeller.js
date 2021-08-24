import React, { useState, useEffect } from "react";
import { getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadingProduct();
  }, []);

  const loadingProduct = async () => {
    setLoading(true);
    const { data } = await getProducts("sold", "desc", 3);
    setProducts(data);
    setLoading(false);
  };

  return (
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
  );
};

export default BestSeller;
