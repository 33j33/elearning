import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        wrapperCol={{ span: 8 }}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
        //   prefix={<UserOutlined className="site-form-item-icon" />}
        //   placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 8 }}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
      <br />
      <br />
      {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
      {/* </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
