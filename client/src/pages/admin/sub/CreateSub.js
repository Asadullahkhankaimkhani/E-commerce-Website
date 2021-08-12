import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForms from "../../../components/forms/CategoryForms";
import LocalSearch from "../../../components/forms/LocalSearch";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub } from "../../../functions/sub";

import { useState, useEffect } from "react";

const CreateSub = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
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

        toast.success(`${res.data.name} is created`);
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
        </div>
      </div>
    </div>
  );
};

export default CreateSub;
