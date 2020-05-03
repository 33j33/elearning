import React, { Component } from "react";
import { Modal, Tabs, Row, Col, Form, Input, Button, Radio, Divider, DatePicker } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";



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


    //@DESC MODAL OPERATIONS
    showSModal = () => {
        this.setState({
            visible: true,
        });
    };

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
    onFinish = (values) => {
        console.log("Success:", values);
    };

    onFinishFailed = (errorInfo) => {
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
                                {...layout}
                                name="basic"
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Row justify="center">
                                    <Col span={24}>
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your Username!",
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
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
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
                                <Row justify="space-between">
                                    <Col span={12}>
                                        <Form.Item
                                            name="dob"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your DOB',
                                                },
                                            ]}
                                        >

                                            <DatePicker placeholder="Select DOB" style={{ width: "92%" }} />
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Divider plain>Educational Details</Divider>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item name="12th" label="12th" rules={[{ required: true }]}>
                                            <Radio.Group name="12thStatus" >
                                                <Radio value={true}>
                                                    Passed
                </Radio>
                                                <Radio value={false}>
                                                    Appearing
                </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>If Passed</Row>
                                <Row justify="space-between">
                                    <Col span={11}>
                                        <Form.Item
                                            name="College Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your College Name!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="College Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            name="Branch"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your Branch!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Branch" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <br />
                                <Row justify="center">
                                    <Col >
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
