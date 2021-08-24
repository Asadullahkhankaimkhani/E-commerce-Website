import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
const Product = ({ match }) => {
  const [product, setProduct] = useState([]);
  const { slug } = match.params;

  useEffect(() => {
    loadingSingleProduct();
  }, [slug]);

  const loadingSingleProduct = async () => {
    const { data } = await getProduct(slug);
    setProduct(data);
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
      <div className="row">
        <div className="col text-center pb-5 pt-5">
          <hr />
          <h4>Related Product</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
