import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";

// import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { LoadingOutlined } from "@ant-design/icons";

// import { createProduct } from "../../../functions/product";
// import ProductCreateForm from "../../../components/forms/ProductCreateForm";
// import FileUpload from "../../../components/forms/FileUpload";

// import { getCategories, getCategorySubs } from "../../../functions/category";

const ProductUpdate = ({ match }) => {
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          <hr />
          {JSON.stringify(slug)}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
