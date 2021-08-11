import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  // Handle Search
  const handleSerach = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      className="form-control"
      placeholder="Fliter"
      value={keyword}
      onChange={handleSerach}
    />
  );
};

export default LocalSearch;
