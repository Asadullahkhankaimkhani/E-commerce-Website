import React, { useEffect, useState } from "react";
import { getProductByCount } from "../functions/product";

const Home = () => {
  const [produuct, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadingProduct();
  }, []);

  const loadingProduct = async () => {
    const res = await getProductByCount(3);
    setProduct(res.data);
  };

  return (
    <div>
      <p>React Home</p>
      {JSON.stringify(produuct)}
    </div>
  );
};

export default Home;
