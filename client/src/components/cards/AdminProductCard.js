import React from "react";
import { Card } from "antd";

const AdminProductCard = ({ product }) => {
  const { Meta } = Card;

  const { title, description, images } = product;
  console.log(images);
  return (
    <Card
      cover={
        <img
          alt=""
          src={images && images.length > 0 ? images[0].url : "No Image Found"}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
