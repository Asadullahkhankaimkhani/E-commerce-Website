import React from "react";

const CategoryForms = ({ handleSubmit, name, setName, btnName }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />

          <button className="btn btn-outline-primary">{btnName}</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForms;
