import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
import Category from "../../components/Category";
import Store from "../../components/Store";
import Employee from "../../components/Employee";
import Product from "../../components/Product";

const { Sider, Content } = Layout;

const HomePage = () => {
  const role = localStorage.getItem("role");
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <p>Dashboard Content</p>;
      case "2":
        return <Store />;
      case "3":
        return <Employee />;
      case "4":
        return <Category />;
      case "5":
        return <Product />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          {role === "admin" && (
            <>
              <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                Stores
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                Employees
              </Menu.Item>
            </>
          )}
          {role === "employee" && (
            <>
              <Menu.Item key="4" icon={<AppstoreOutlined />}>
                Categories
              </Menu.Item>
              <Menu.Item key="5" icon={<DropboxOutlined />}>
                Products
              </Menu.Item>
            </>
          )}
        </Menu>
        <Menu
          theme="dark"
          mode="inline"
          style={{ position: "absolute", bottom: 0 }}
        >
          <Menu.Item key="6" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "20px", background: "#ccc" }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
