import React, { useState } from "react";

import { Layout as Layouts } from "antd";
import Navbar from "./Navbar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layouts;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);
  return (
    <Layouts className={`${collapsed && 'ml-[80px]'} ml-[200px]`}>
      <Navbar collapsed={collapsed} />
      <Layouts>
        <Header className="bg-white flex items-center fixed w-full z-10">
          <div onClick={toggle} className="text-xl">
            {collapsed ? (
              <MenuUnfoldOutlined className="cursor-pointer" />
            ) : (
              <MenuFoldOutlined className="cursor-pointer" />
            )}
          </div>
        </Header>

        <Content className="m-5 bg-white p-7 mt-16">{children}</Content>
      </Layouts>
    </Layouts>
  );
};

export default Layout;
