import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForms from "../../../components/forms/CategoryForms";
import LocalSearch from "../../../components/forms/LocalSearch";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  createSub,
  getSubs,
  removeSub,
  updateSub,
} from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useState, useEffect } from "react";

const CreateSub = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadcategories();
    loadSubs();
  }, []);

  const loadcategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  const loadSubs = async () => {
    try {
      const res = await getSubs();
      setSubs(res.data);
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setName("");
        loadSubs();
        toast.success(`${res.data.name} is created`);
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.response.data);
      });
  };

  // handle Remove

  const handleRemove = async (slug) => {
    let ans = window.confirm("Delete?");

    if (ans) {
      setLoading(true);
      try {
        const res = await removeSub(slug, user.token);
        setLoading(false);
        toast.error(`${res.data.name} deleted`);

        loadSubs();
      } catch (error) {
        if (error.response.status === 400) toast.error(error.response.data);
      }
    }
  };
  // serached
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Create a Sub Category</h4>
          <div className="from-group">
            <label htmlFor="cat">Select a Category</label>
            <select
              name="cat"
              className="custom-select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select a Category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          {JSON.stringify(category)}

          <CategoryForms
            name={name}
            setName={setName}
            btnName="Save"
            handleSubmit={handleSubmit}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />

          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              <Link to={`/admin/category/${s.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSub;
