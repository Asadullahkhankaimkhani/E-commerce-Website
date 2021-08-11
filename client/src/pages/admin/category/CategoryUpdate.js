import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForms from "../../../components/forms/CategoryForms";

const CategoryUpdate = ({ history, match }) => {
  // states
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Redux State
  const { user } = useSelector((state) => ({ ...state }));

  // useEffect fetch categores
  useEffect(() => {
    loadcategory();
  }, []);
  // load

  const loadcategory = async () => {
    getCategory(match.params.slug).then((c) => setName(c.data.name));
  };
  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setName("");
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <AdminNav />
          </div>
          <div className="col">
            <h4>Update Category</h4>
            <CategoryForms
              name={name}
              setName={setName}
              btnName="Update"
              handleSubmit={handleSubmit}
            />
            <hr />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default CategoryUpdate;
