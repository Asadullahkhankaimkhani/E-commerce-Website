import React, { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import { LoadingOutlined } from "@ant-design/icons";
import { getSub } from "../../functions/sub";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then(({ data }) => {
      setSub(data.sub);
      setProduct(data.products);
      setLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              <LoadingOutlined />
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {`${product.length}`} Found in this "{`${sub.name}`}" Sub Category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {product.map((p) => (
          <div key={p._id} className="col-md-3">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
