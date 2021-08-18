import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AdminProductCard = ({ product, handleRemove }) => {
  const { Meta } = Card;

  const { title, description, images, slug } = product;
  console.log(images);
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
        <EditOutlined className="text-warning" />,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
