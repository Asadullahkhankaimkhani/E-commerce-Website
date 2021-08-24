import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
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
  return <div>Product</div>;
};

export default Product;
