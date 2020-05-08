import React, { Component } from "react";
import {
  Modal,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  Button
} from "antd";
import { message } from 'antd';

import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import axios from "axios";


const successForregistration = () => {
  message.success('Succesfully Registered Login to Continue');
};

const errorForRegistration = () => {
  message.error('Registration Failed');
};

const successForlogin = () => {
  message.success('Succesfully Loggedin');
};

const errorForlogin = () => {
  message.error('Login Failed');
};
const { TabPane } = Tabs;

class studentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
    };
    this.showSModal = this.showSModal.bind(this);
  }
  formRef = React.createRef();

  //@DESC MODAL OPERATIONS
  showSModal = () => {
    this.setState({
      visible: true,
    });
  };

  //BUTTONS FOR MODAL
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };
  //Login for students
  onFinish = (values) => {

    axios.post('https://elearningserver.herokuapp.com/studentlogin',
      values
    )
      .then(response => {
        console.log(response);
        this.formRef.current.resetFields()
        successForlogin();
        this.setState({
          visible: false,
        });
      })
      .catch(error => {
        console.log(error.response)
        errorForlogin()
              });

  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  //for Registering Student
  onFinishRegis = (values) => {
    console.log(values)
    axios
      .post("https://elearningserver.herokuapp.com/registerstudent",
        values
      )
      .then(response => {
        console.log(response);
        this.setState({
          visible: false,
        });
        successForregistration();
        this.formRef.current.resetFields();

      })
      .catch(error => {
        console.log(error.response)
        errorForRegistration()
      });
  };

  onFinishFailedRegis = (errorInfo) => {
    console.log("Failed:", errorInfo);

  };

  render() {
    const layout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 16,
      },
    };

    return (
      <div>
        <Modal
          width={600}
          style={{ top: 20 }}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <LoginOutlined />
                  Signin
                </span>
              }
              key="1"
            >
              <Form
                ref={this.formRef}

                {...layout}
                name="basic"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Row justify="center">
                  <Col span={24}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={24}>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <UserAddOutlined />
                  Sign Up
                </span>
              }
              key="2"
            >
              <Form
                ref={this.formRef}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinishRegis}
                onFinishFailed={this.onFinishFailedRegis}
                size="medium"
              >
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Mobile Number!",
                        },
                      ]}
                    >
                      <Input placeholder="Mobile" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Password" />
                    </Form.Item>
                  </Col>
                </Row>

                <br />
                <Row justify="center">
                  <Col>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>{" "}
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default studentModal;
