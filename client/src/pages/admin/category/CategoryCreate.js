import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getCategories,
  deletCategory,
  createCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForms from "../../../components/forms/CategoryForms";

const CategoryCreate = () => {
  // states
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  // Redux State
  const { user } = useSelector((state) => ({ ...state }));
  // useEffect fetch categores
  useEffect(() => {
    loadcategories();
  }, []);
  // load

  const handleRemove = async (slug) => {
    let ans = window.confirm("Delete?");

    if (ans) {
      setLoading(true);
      try {
        const res = await deletCategory(slug, user.token);
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        loadcategories();
      } catch (error) {
        if (error.response.status === 400) toast.error(error.response.data);
      }
    }
  };
  const loadcategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        loadcategories();
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setName("");
        toast.error(err.response.data);
      });
  };

  // Handle Search
  const handleSerach = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  // serached
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <AdminNav />
          </div>
          <div className="col">
            <h4>Create a Category</h4>
            <CategoryForms
              name={name}
              setName={setName}
              btnName="Save"
              handleSubmit={handleSubmit}
            />
            <input
              type="search"
              className="form-control"
              placeholder="Fliter"
              value={keyword}
              onChange={handleSerach}
            />
            <hr />
            {categories.filter(searched(keyword)).map((c) => (
              <div className="alert alert-secondary" key={c._id}>
                {c.name}
                <span
                  onClick={() => handleRemove(c.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>{" "}
                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>{" "}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default CategoryCreate;
