import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";

const ProductCard = ({ product }) => {
  const { Meta } = Card;

  const { images, title, description, slug, price } = product;

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
  };

  return (
    <>
      <div>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No Rating yet</div>
        )}
      </div>

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
          <Link onClick={handleToAddToCart}>
            <ShoppingCartOutlined className="text-danger" />
            <br /> add to Card{" "}
          </Link>,
        ]}
      >
        <Meta
          title={`${title} - $ ${price} `}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
