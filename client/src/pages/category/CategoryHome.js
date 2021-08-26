import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then(({ data }) => setCategory(data));
  }, []);

  return <div>{JSON.stringify(category)}</div>;
};

export default CategoryHome;
