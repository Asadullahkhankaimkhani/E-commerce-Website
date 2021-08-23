import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { Meta } = Card;

  const { images, title, description, slug } = product;

  return (
    <Card
      cover={
        <img
          alt=""
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" />
          <br />
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" />
          <br /> add to Card{" "}
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
