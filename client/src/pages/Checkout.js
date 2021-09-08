import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSave, setAddressSave] = useState(false);
  const [coupon, setCoupon] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then(({ data }) => {
      setProducts(data.products);
      setTotal(data.cartTotal);
    });
  }, []);

  const emptyCart = async () => {
    try {
      // Remove form local Storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      // Remove from Redux State
      dispatch({
        type: "Add_TO_CART",
        payload: [],
      });

      // Remove from Backend
      const res = await emptyUserCart(user.token);
      setProducts([]);
      setTotal(0);
      toast("Cart is empty.Continue Shopping");
    } catch (error) {
      console.log(error);
    }
  };

  const saveAddresstoDb = async () => {
    // console.log(address);
    const { data } = await saveUserAddress(user.token, address);
    console.log(data);
    if (data.ok) {
      setAddressSave(true);
      toast.success("Address saved");
    }
  };

  const applyDiscountCoupon = () => {
    console.log(coupon);
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt2" onClick={saveAddresstoDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setCoupon(e.target.value)}
        value={coupon}
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon</h4>
        {showApplyCoupon()}
      </div>
      <div className="col-md-6">
        <h4>Order Summary </h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${total}</p>
        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSave || !products.length}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              disabled={!products.length}
              className="btn btn-primary"
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
