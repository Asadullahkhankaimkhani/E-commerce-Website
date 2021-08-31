import React, { useEffect, useState } from "react";
import { getProductByCount, fetchProductByFilter } from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesIds, setCategoriesIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));

  const { text } = search;
  const { SubMenu, ItemGroup } = Menu;

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadAllProducts();
    // Fetch Categories
    getCategories().then(({ data }) => setCategories(data));
    // Fetch Sub Categories
    getSubs().then(({ data }) => setSubs(data));
  }, []);

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = async (arg) => {
    const { data } = await fetchProductByFilter(arg);
    setProducts(data);
  };

  // 3.load products based on price range

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoriesIds([]);
    setStar("");
    setSub("");

    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          onChange={handleCheck}
          checked={categoriesIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = async (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);

    setStar("");
    setSub("");

    let intheState = [...categoriesIds];
    let justChecked = e.target.value;
    let findInTheState = intheState.indexOf(justChecked);

    // if not found return -1 else index
    if (findInTheState === -1) {
      intheState.push(justChecked);
    } else {
      intheState.splice(findInTheState, 1);
    }

    setCategoriesIds(intheState);
    console.log(intheState);

    fetchProducts({ category: intheState });
  };

  // 5. Product by Star Rating

  const handleStarClick = (num) => {
    //console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoriesIds([]);
    setPrice([0, 0]);
    setSub("");
    setStar(num);
    fetchProducts({ star: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. Show Sub Categories
  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesIds([]);
    setStar("");
    fetchProducts({ sub });
  };
  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>search/filter menu</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="49999"
                />
              </div>
            </SubMenu>

            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}> {showCategories()}</div>
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Stars Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}> {showStars()}</div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Category
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5 pt-2">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
