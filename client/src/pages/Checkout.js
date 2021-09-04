import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../functions/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then(({ data }) => {
      setProducts(data.products);
      setTotal(data.cartTotal);
    });
  }, []);

  const saveAddresstoDb = () => {
    //
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea
        <button className="btn btn-primary mt2" onClick={saveAddresstoDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon</h4>
        coupon input and apply button
      </div>
      <div className="col-md-6">
        <h4>Order Summary </h4>
        <hr />
        <p>{JSON.stringify(products)}</p>
        <hr />
        <p>Cart Total: ${total}</p>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
