import lib, { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then(({ data }) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);
  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col m-2 btn btn-outlined-primary btn-lg btn-block btn-raised"
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));
  return (
    <div className="container ">
      <div className="row ">
        {loading ? (
          <div>
            <h3>
              {" "}
              <LoadingOutlined />
            </h3>
          </div>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
