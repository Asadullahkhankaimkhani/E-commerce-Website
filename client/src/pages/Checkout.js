import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSave, setAddressSave] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscout, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, cod } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

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
        type: "ADD_TO_CART",
        payload: [],
      });

      // Remove from Backend
      const res = await emptyUserCart(user.token);
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
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
    // console.log(coupon);
    applyCoupon(user.token, coupon).then(({ data }) => {
      console.log(data);
      if (data) {
        setTotalAfterDiscount(data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (data.err) {
        setDiscountError(data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
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
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const createCashOrder = async () => {
    const { data } = await createCashOrderForUser(
      user.token,
      cod,
      couponTrueOrFalse
    );
    if (data.ok) {
      // empty local storage
      if (typeof windwp !== "undefined") localStorage.removeItem("cart");
      // empty redux coupon
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
      // empty redux cod
      dispatch({
        type: "COD",
        payload: false,
      });
      // empty cart
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // empty user cart
      emptyUserCart(user.token);
      // redirect
      setTimeout(() => {
        history.push("/user/history");
      }, 1000);
    }

    // createCashOrderForUser(user.token, cod, couponTrueOrFalse).then(
    //   ({ data }) => {
    //       console.log("User cash order created res", data)
    //   }
    //     //  empty cart from redux . local storage . reset coupon , rest cod , redirect
    //   if (data.ok) {
    //     // empty local storage
    //     if (typeof windwp !== "undefined") localStorage.removeItem("cart");
    //     // empty redux coupon
    //     dispatch({
    //       type: "COUPON_APPLIED",
    //       payload: false,
    //     });
    //     // empty redux cod
    //     dispatch({
    //       type: "COD",
    //       payload: false,
    //     });
    //     // empty cart
    //     dispatch({
    //       type: "ADD_TO_CART",
    //       payload: [],
    //     });
    //     // empty user cart
    //     emptyUserCart(user.token);
    //     // redirect
    //     setTimeout(() => {
    //       history.push("/user/history");
    //     }, 1000);
    //   }
    // };
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon</h4>
        {showApplyCoupon()}
        <hr />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>
      <div className="col-md-6">
        <h4>Order Summary </h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${total}</p>
        {totalAfterDiscout > 0 && (
          <p className="bg-success p-2">
            Total After Discount Payable: ${totalAfterDiscout}
          </p>
        )}
        <div className="row">
          <div className="col-md-6">
            {cod ? (
              <button
                className="btn btn-primary"
                disabled={!addressSave || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSave || !products.length}
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            )}
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
