import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { LoadingOutlined } from "@ant-design/icons";

import { getProduct } from "../../../functions/product";
// import ProductCreateForm from "../../../components/forms/ProductCreateForm";
// import FileUpload from "../../../components/forms/FileUpload";

// import { getCategories, getCategorySubs } from "../../../functions/category";
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

const ProductUpdate = ({ match }) => {
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialState);
  const { slug } = match.params;

  const loadProduct = async () => {
    try {
      const res = await getProduct(slug);
      setValues({ ...values, ...res.data });
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          <hr />
          {JSON.stringify(values)}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
