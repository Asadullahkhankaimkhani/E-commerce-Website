import React from "react";
import laptop from "../../images/laptop.jpg";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const color = ["Black", "Brown", "Silver", "White", "Blue"];

  const dispatch = useDispatch();

  // Handle Color Function
  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }
    cart.map((product, i) => {
      if (product._id === p._id) {
        cart[i].color = e.target.value;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  /// Handle Quantity Function

  const handleQunatityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Maximium Available Quantity is ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }
    cart.map((product, i) => {
      if (product._id == p._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  // Remove Item from Cart
  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id == p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td style={{ width: "120px", height: "auto" }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </td>
        <td className="text-center"> {p.title}</td>
        <td className="text-center">{p.price}</td>
        <td className="text-center">{p.brand}</td>
        <td className="text-center">
          <select
            name="color"
            onChange={handleColorChange}
            className="form-control"
          >
            {p.color ? (
              <option key={p.color} value={p.color}>
                {p.color}
              </option>
            ) : (
              <option>
                <select>Select</select>
              </option>
            )}
            {color
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQunatityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined onClick={handleRemove} className="btn text-danger" />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
