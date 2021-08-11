import React from "react";
import AdminNav from "../../../components/nav/AdminNav";

const CategoryCreate = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <AdminNav />
          </div>
          <div className="col">Create a Category</div>
        </div>
      </div>{" "}
    </>
  );
};

export default CategoryCreate;
