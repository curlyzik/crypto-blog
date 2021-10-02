import React from "react";
import { useState } from "react";

import { Layout as Layouts } from "antd";
import Navbar from "./Navbar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layouts;
const [collapsed, setCollapsed] = useState(false);
const toggle = () => setCollapsed(!collapsed);

const Layout = ({ children }) => {
  return (
    <Layouts>
      <Navbar />
      <Layouts>
        <Header className="bg-white flex items-center">
          <div onClick={toggle} className="text-xl">
            {collapsed ? (
              <MenuUnfoldOutlined className="cursor-pointer" />
            ) : (
              <MenuFoldOutlined className="cursor-pointer" />
            )}
          </div>
        </Header>

        <Content className="m-5 bg-white p-4">{children}</Content>
      </Layouts>
    </Layouts>
  );
};

export default Layout;
