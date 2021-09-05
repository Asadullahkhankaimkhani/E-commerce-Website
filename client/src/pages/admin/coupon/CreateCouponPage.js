import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await createCoupon(
        { name, expiry, discount },
        user.token
      );
      setLoading(false);
      setName("");
      setDiscount("");
      setExpiry("");
      toast.success(`${data.name} Coupoun is Created`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
          <form onSubmit={handleSubmit}>
            <div className="from-group">
              <label htmlFor="" className="text-muted">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="from-group">
              <label htmlFor="" className="text-muted">
                Discount
              </label>
              <input
                type="text"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="from-group">
              <label htmlFor="" className="text-muted">
                Expiry
              </label>
              <DatePicker
                className="form-control"
                value={expiry}
                selected={new Date()}
                required
                onChange={(date) => setExpiry(date)}
              />
            </div>
            <button className="btn btn-outlined-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
