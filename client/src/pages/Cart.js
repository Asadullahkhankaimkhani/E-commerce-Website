import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  // redux
  const { cart, user } = useSelector((state) => ({ ...state }));
  const disptch = useDispatch();

  return (
    <div className="container-fluid">
      <div className="row">
        <h4>Cart</h4>
      </div>
    </div>
  );
};

export default Cart;
