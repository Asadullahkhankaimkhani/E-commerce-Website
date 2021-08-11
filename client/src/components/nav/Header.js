import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreAddOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="mail" icon={<AppstoreAddOutlined />} className="mr-auto">
        <Link to="/">Home</Link>
      </Item>
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email.split("@")[0]}
        >
          {user && user.role === "subscriber" && (
            <Item key="dashboard">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item key="dashboard">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item key="log-out" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      {!user && (
        <>
          <Item key="login" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Item>
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
        </>
      )}
    </Menu>
  );
};

export default Header;
