import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const { Meta } = Card;
  const [tooltip, setTooltip] = useState("Click to add");
  const { images, title, description, slug, price } = product;

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

    // add to redux state sending Unique Products
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });

    // Add redux State and showing Drawer

    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
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
          <Link to={`/product/${slug}`} key="productview">
            <EyeOutlined className="text-warning" />
            <br />
            View Product
          </Link>,
          <Tooltip key="tooltip" title={tooltip}>
            <a
              onClick={product.quantity < 1 ? "" : handleToAddToCart}
              key="productadd"
              disabled={product.quantity < 1}
            >
              <ShoppingCartOutlined className="text-danger" />
              <br /> {product.quantity < 1 ? "Out of Stock" : "Add to cart"}
            </a>
          </Tooltip>,
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
