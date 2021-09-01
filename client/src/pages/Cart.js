import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  // redux
  const { cart, user } = useSelector((state) => ({ ...state }));
  const disptch = useDispatch();

  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>
          {!cart.length ? (
            <p>
              No Product in cart{" "}
              <Link to="/shop" className="btn btn-info">
                {" "}
                Contiune Shopping
              </Link>
            </p>
          ) : (
            "Show the Product"
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <b>Total ${getTotal()}</b>
          <hr />
          {user ? (
            <button className="btn btn-sm btn-priamry mt-2">
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn primary mt2">
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
