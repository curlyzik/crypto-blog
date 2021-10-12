import React, { useState } from "react";

import { Layout as Layouts } from "antd";
import Navbar from "./Navbar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layouts;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);
  return (
    <Layouts className={`${collapsed && "ml-[80px]"}  ${!collapsed && "ml-[200px]"}`}>
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

        <Content className="m-5 p-6 md:p-10 mt-16 bg-[#f0f2f5]">
          {children}
        </Content>
      </Layouts>
    </Layouts>
  );
};

export default Layout;
