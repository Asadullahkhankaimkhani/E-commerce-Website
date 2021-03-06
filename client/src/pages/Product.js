import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { productRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
const Product = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadingSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });
  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadingSingleProduct(); // if you want to show updated rating in real time
    });
  };

  const loadingSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      productRelated(res.data._id).then((res) => {
        setRelated(res.data);
      });
    });
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
      <div className="row pb-5">
        {related.length > 0 ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="col text-center pb-5 pt-5">
            <h4>No Product Found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
