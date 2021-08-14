import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories} from '../../../functions/category'

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
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



  useEffect(() => {
    loadcategories();
  }, []);
  
  const loadcategories = async () => {
    try {
      const res = await getCategories();
      setValues({ ...values,categories:res.data});
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };
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
