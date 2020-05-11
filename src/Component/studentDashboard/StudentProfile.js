import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Layout } from "antd";

class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phone: "",
      email: "",
    };
  }
  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(currentUser);
    this.setState({
      username: currentUser.username,
      email: currentUser.email,
      phone: currentUser.phone,
    });
  }
  render() {
    const { Content } = Layout;

    const layout2 = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <div>
        <Form
          layout2
          name="basic"
          initialValues={{
            remember: true,
          }}
          layout="Horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Username">
            <Input value={this.state.username} disabled />
          </Form.Item>

          <Form.Item label="Email">
            <Input value={this.state.email} />
          </Form.Item>

          <Form.Item label="Mobile Number">
            <Input value={this.state.phone} />
          </Form.Item>

          <Form.Item tailLayout>
            <h6>Change Password</h6>
          </Form.Item>

          <Form.Item label="Password" layout="inline" id="p1">
            <Input placeholder="Enter Password" />
          </Form.Item>

          <Form.Item label="Confirm Password" layout="inline" id="p2">
            <Input placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item tailLayout>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default StudentProfile;
