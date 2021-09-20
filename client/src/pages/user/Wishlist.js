/** @format */

import React, { useState, useEffect } from "react";
import { getWishlist, removeWishlist } from "../../functions/user";
import UserNav from "../../components/nav/UserNav";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const { data } = await getWishlist(user.token);
    const { wishlist } = data;
    setWishlist(wishlist);
  };

  // const loadWishlist = () => {
  //   getWishlist(user.token).then((res) => setWishlist(res.data.wishlist));
  // };

  const handleRemove = async (productId) => {
    const { data } = removeWishlist(productId, user.token);
    toast("Item is deleted");
    loadWishlist();
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col-md-10'>
          <h4>Wishlist</h4>
          {wishlist.map((p) => (
            <div key={p._id} className='alert alert-secondary'>
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className='float-right btn btn-sm'>
                <DeleteOutlined className='text-danger' />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
