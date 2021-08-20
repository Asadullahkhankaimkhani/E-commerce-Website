import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOption] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      setValues({ ...values, ...p.data });
    });
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(res.data);
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoriesChange = async (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    const res = await getCategorySubs(e.target.value);
    console.log(res);
    setSubOption(res.data);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product update</h4>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoriesChange={handleCategoriesChange}
            categories={categories}
            subOptions={subOptions}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
