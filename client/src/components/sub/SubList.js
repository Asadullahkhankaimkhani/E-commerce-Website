import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSub, getSubs } from "../../functions/sub";
const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then(({ data }) => {
      setSubs(data);
      setLoading(false);
    });
  }, []);
  const showCategories = () =>
    subs.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/sub/${c.slug}`}>{c.name}</Link>
      </div>
    ));
  return (
    <div className="container ">
      <div className="row ">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default SubList;
