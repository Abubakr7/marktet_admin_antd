import React, { useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import reactLogo from "../assets/react.svg";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { destroyToken, getToken } from "../utils/axiosRequest";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    label: (
      <>
        <UserOutlined />
        Profile
      </>
    ),
  },
  {
    key: "2",
    label: (
      <Link
        to="/"
        onClick={() => {
          destroyToken();
        }}
      >
        Logout
      </Link>
    ),
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleTabClosing = () => {
    let remember = JSON.parse(localStorage.getItem("rememberMe"));
    if (!remember) {
      destroyToken();
    }
  };
  useEffect(() => {
    window.addEventListener("unload", () => {});
    return () => {
      window.removeEventListener("unload", handleTabClosing);
    };
  });
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <Avatar size={100} icon={<img src={reactLogo} alt="user" />} />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { icon: UserOutlined, path: "/dashboard", label: "Dasboard" },
            {
              icon: VideoCameraOutlined,
              path: "/dashboard/products",
              label: "Products",
            },
            {
              icon: UploadOutlined,
              path: "/dashboard/categories",
              label: "Categories",
            },
            { icon: UserOutlined, path: "/dashboard/brands", label: "Brands" },
            { icon: UserOutlined, path: "/dashboard/users", label: "Users" },
          ].map((elem, index) => ({
            key: String(index + 1),
            onClick: () => {
              navigate(elem.path);
            },
            icon: React.createElement(elem.icon),
            label: elem.label,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 20,
          }}
        >
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Avatar
              style={{
                backgroundColor: "green",
                verticalAlign: "middle",
              }}
              size="large"
            >
              Abubakr
            </Avatar>
          </Dropdown>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
