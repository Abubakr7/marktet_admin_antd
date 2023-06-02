import {
  Avatar,
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  message,
} from "antd";
import React from "react";
import Icon from "@ant-design/icons";
import reactLogo from "../assets/react.svg";
import { axiosLogin, saveToken } from "../utils/axiosRequest";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password, remember } = values;
    try {
      const { data } = await axiosLogin.post("login", {
        email,
        password,
      });
      saveToken(data.accessToken, remember);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundSize: "cover",
        backgroundImage: `url(
          "https://media.istockphoto.com/id/1160967859/photo/man-holding-modern-mobile-smartphone-with-login-form.jpg?b=1&s=612x612&w=0&k=20&c=JVF7t1yiRC1suDBhRV5LPcPn_HvL-4eD75jqadc5bsE="
        )`,
      }}
    >
      <div
        style={{
          width: 340,
          padding: 20,
          background: "#353333",
          color: "white",
          borderRadius: 10,
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          //   autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Avatar size={100} icon={<img src={reactLogo} alt="user" />} />
          </div>

          <Form.Item
            label={<label style={{ color: "#fff" }}>Email</label>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              type="email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label={<label style={{ color: "#fff" }}>Password</label>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Checkbox style={{ color: "#fff" }}>Remember me</Checkbox>
              <a style={{ float: "right" }} href="">
                Forgot password
              </a>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
