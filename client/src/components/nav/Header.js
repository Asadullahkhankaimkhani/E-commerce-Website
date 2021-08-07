import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreAddOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="mail" icon={<AppstoreAddOutlined />}>
        Home
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
        Login
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        Register
      </Item>
    </Menu>
  );
};

export default Header;
