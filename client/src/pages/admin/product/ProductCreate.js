import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  catagories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenavo", "Asus"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const {user} = useSelector((state)=>({...state}))

  const {
    title,
    description,
    price,
    catagories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status !== 200) toast.error(err.response.data);
        toast.error(err.response.data.err)
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          <hr />
          <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} values = {values} />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
