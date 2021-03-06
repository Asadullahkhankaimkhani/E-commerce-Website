import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";
import { Link } from "react-router-dom";
import "../../stripe.css";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import Laptop from "../../images/laptop.jpg";
import { createOrder, emptyUserCart } from "../../functions/user";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after Successfil payment
      // create order and save database for admin to process
      createOrder(payload, user.token).then(({ data }) => {
        if (data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");

          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });

          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then(({ data }) => {
      console.log("create payment intent", data);
      setClientSecret(data.clientSecret);
      setCartTotal(data.cartTotal);
      setTotalAfterDiscount(data.totalAfterDiscount);
      setPayable(data.payable);
    });
  }, []);

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">
              Total After Discount ${totalAfterDiscount}
            </p>
          ) : (
            <p className="alert alert-danger">No Coupon Applied</p>
          )}
        </div>
      )}
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <div className="text-center pb-5">
          <Card
            cover={
              <img
                src={Laptop}
                alt="img"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "-50px",
                }}
              />
            }
            actions={[
              <>
                <DollarOutlined className="text-info" /> <br /> Total: $
                {cartTotal}
              </>,
              <>
                <CheckOutlined className="text-info" /> <br /> Total payable: $
                {(payable / 100).toFixed(2)}
              </>,
            ]}
          />
        </div>

        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          className="stripe-button"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <Link to="/user/history"> Watch payment history</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
