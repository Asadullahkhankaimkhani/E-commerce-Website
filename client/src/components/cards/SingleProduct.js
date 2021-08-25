import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.jpg";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const { TabPane } = Tabs;

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
        <div></div>
        <Card
          actions={[
            <>
              <ShoppingOutlined className="text-success" /> <br /> Add to Cart
            </>,
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
