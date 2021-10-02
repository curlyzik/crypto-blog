import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Navbar = () => {
  return (
    <>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen"
      >
        <div className="text-3xl text-gray-900">Logo</div>
        <Menu theme="" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link href="/news">
              <a>News</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link href="/exchanges">
              <a>Exhnages</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link href="/cryptocurrencies">
              <a>Cryptocurrencies</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Navbar;
