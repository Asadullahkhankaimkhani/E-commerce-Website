import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.jpg";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const { TabPane } = Tabs;
  const [tooltip, setTooltip] = useState("Click to add");
  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleToAddToCart = () => {
    // Create cart array
    let cart = [];
    if (typeof window !== "undefined")
      if (localStorage.getItem("cart")) {
        // if cart is in localstroage fet it
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    // push new product to cart
    cart.push({
      ...product,
      count: 1,
    });
    // remove dupicates
    let unique = _.uniqWith(cart, _.isEqual);

    // save to local storage
    localStorage.setItem("cart", JSON.stringify(unique));
    setTooltip("Added");

    // add to redux state
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((i) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img key={i.url} src={i.url} alt="Product Image" />
            ))}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Laptop} alt="No Product" className="card-image" />}
          ></Card>
        )}
        <Tabs type="card">
          <TabPane key="1" tab="Description">
            {description && description}
          </TabPane>
          <TabPane key="2" tab="More">
            Call us on 0333 25906061
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <div>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-center pt-1 pb-3">No Rating yet</div>
          )}
        </div>
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <Link onClick={handleToAddToCart}>
                <ShoppingCartOutlined className="text-danger" />
                <br /> add to Card
              </Link>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
