import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";

import { getCategories, getCategorySubs } from "../../../functions/category";

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
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asur"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOption] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = async () => {
    try {
      const res = await getCategories();
      setValues({ ...values, categories: res.data });
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCategoriesChange = async (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    const res = await getCategorySubs(e.target.value);
    console.log(res);
    setSubOption(res.data);
    setShowSubs(true);
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
        toast.error(err.response.data.err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? <LoadingOutlined spin /> : <h4>Product Create</h4>}
          <hr />
          {/* {JSON.stringify(values.images)} */}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoriesChange={handleCategoriesChange}
            subOptions={subOptions}
            showSubs={showSubs}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
