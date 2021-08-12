import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForms from "../../../components/forms/CategoryForms";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { getSub, updateSub } from "../../../functions/sub";

import { useState, useEffect } from "react";

const UpdateSub = ({ match, history }) => {
  const [parent, setParent] = useState("");

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadcategories();
    loadSub();
  }, []);

  const loadcategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  const loadSub = async () => {
    try {
      const res = await getSub(match.params.slug);
      setName(res.data.name);
      setParent(res.data.parent);
      console.log(res);
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setName("");
        toast.success(`${res.data.name} is Updated`);
        history.push("/admin/sub");
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Update a Sub Category</h4>
          <div className="from-group">
            <label htmlFor="cat">Select a Category</label>
            <select
              name="cat"
              className="custom-select"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please Select a Category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForms
            name={name}
            setName={setName}
            btnName="Save"
            handleSubmit={handleSubmit}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};

export default UpdateSub;
