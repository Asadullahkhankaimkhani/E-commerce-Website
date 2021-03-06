import React, { useState, useEffect } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadingProduct();
  }, [page]);

  useEffect(() => {
    getProductsCount().then(({ data }) => {
      setProductsCount(data);
    });
  }, []);

  const loadingProduct = async () => {
    setLoading(true);
    const { data } = await getProducts("sold", "desc", page);
    setProducts(data);
    setLoading(false);
  };

  return (
    <>
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
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSeller;
