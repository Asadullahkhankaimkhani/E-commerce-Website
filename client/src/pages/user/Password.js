import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector } from "react-redux";

import { LoadingOutlined } from "@ant-design/icons";
const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };

  const passwordUpdateFrom = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new Password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password && password.length < 6}
        >
          {loading ? <LoadingOutlined /> : "Submit"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <div className="col-md-2">
            {user.role === "admin" ? <AdminNav /> : <UserNav />}
          </div>
        </div>
        <div className="col">
          <h1>Password Page</h1>
          {passwordUpdateFrom()}
        </div>
      </div>
    </div>
  );
};

export default Password;
