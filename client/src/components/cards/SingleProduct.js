import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  HeatMapOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;

  return (
    <>
      <div className="col-md-7">Images Carousel</div>
      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingOutlined className="text-success" /> <br /> Add to Cart
            </>,
            <Link to="/">
              <HeatMapOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <Meta title={title} description={description} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
