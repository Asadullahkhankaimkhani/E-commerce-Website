import React from "react";
import laptop from "../../images/laptop.jpg";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";

const ProductCardInCheckout = ({ p }) => {
  const color = ["Black", "Brown", "Silver", "White", "Blue"];

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart"));
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

  return (
    <tbody>
      <tr>
        <td style={{ width: "100px", height: "auto" }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>
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
        <td>{p.count}</td>
        <td>Shipping</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
