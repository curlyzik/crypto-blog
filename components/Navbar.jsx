import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import {
  FundOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Navbar = ({ collapsed }) => {
  return (
    <>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="min-h-full fixed left-0 z-50"
      >
        <div className="text-3xl text-gray-900 p-5 ">Logo</div>
        <Menu theme="" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            className="flex items-center"
          >
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FundOutlined />}
            className="flex items-center"
          >
            <Link href="/cryptocurrencies">
              <a>Cryptocurrencies</a>
            </Link>
          </Menu.Item>
          {/* <Menu.Item
            key="3"
            icon={<MoneyCollectOutlined />}
            className="flex items-center"
          >
            <Link href="/exchanges">
              <a>Exchanges</a>
            </Link>
          </Menu.Item> */}
          <Menu.Item
            key="4"
            icon={<BulbOutlined />}
            className="flex items-center"
          >
            <Link href="/news">
              <a>News</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Navbar;
