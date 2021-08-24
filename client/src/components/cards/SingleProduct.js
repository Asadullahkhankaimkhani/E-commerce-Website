import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.jpg";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import ProductListItems from "./ProductListItems";

const SingleProduct = ({ product }) => {
  const { title, images } = product;

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
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingOutlined className="text-success" /> <br /> Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
