import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

const Product = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadingSingleProduct();
  }, [slug]);

  const onStarClick = async (newRating, name) => {
    setStar(newRating);
    const { data } = await productStar(name, newRating, user.token);
    console.log("Rating Clicked", data);
  };

  const loadingSingleProduct = async () => {
    const { data } = await getProduct(slug);

    setProduct(data);
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
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
