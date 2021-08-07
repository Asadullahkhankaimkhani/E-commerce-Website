import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreAddOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="mail" icon={<AppstoreAddOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title="Username"
        className="mr-auto"
      >
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu>

      <Item key="login" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default Header;
