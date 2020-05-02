import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Divider,
    Radio,
    Row,
    Col
} from 'antd';



const { Option } = Select;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 0,
        },
    },
};


const RegistrationForm = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 50,
                }}
            >
                <Option value="+91">+91</Option>
            </Select>
        </Form.Item>
    );
    const elemStyle = {
        marginLeft: "5px",
        marginRight: "5px"
    }
    return (
        <Form
            //{...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >

            <Row>
                <Col span={12}>
                    <Form.Item
                        name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Row>
                            <Col span={18}>
                                <div style={elemStyle}>
                                    <Input />
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Row>
                            <Col span={18}>
                                <div style={elemStyle}>
                                    <Input />
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
            </Row>
            <Row>

                <Col span={12}>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Row>
                            <Col span={18}>
                                <div style={elemStyle}>
                                    <Input.Password />
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>


                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Row>
                            <Col span={18}>
                                <div style={elemStyle}>
                                    <Input.Password />
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>

                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your DOB',
                            },
                        ]}
                    >
                        <Row>
                            <Col span={18}>
                                <div style={elemStyle}>
                                    <DatePicker />
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Row>
                            <Col span={18}>
                                <div style={elemStyle}>
                                    <Input
                                        addonBefore={prefixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
            </Row>
            <Divider plain>Educational Details</Divider>
            <Form.Item name={["10th"]} label="10th" rules={[{ required: true }]}>
                <Radio.Group name="10thStatus" >
                    <Radio value={true}>
                        Passed
                </Radio>
                    <Radio value={false}>
                        Appearing
                </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name={["12th"]} label="12th" rules={[{ required: true }]}>
                <Radio.Group name="12thStatus" >
                    <Radio value={true}>
                        Passed
                </Radio>
                    <Radio value={false}>
                        Appearing
                </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16 }} name={["schoolName"]} label="School Name" rules={[{ required: true }]}>
                <div style={elemStyle}>
                    <Input />
                </div>
            </Form.Item>
            {/* <Row>
                <Col span={12}>
                    <Form.Item name={["schoolName"]} label="School Name" rules={[{ required: true }]}>
                        <Row>
                            <Col span={18}><Input /></Col>
                        </Row>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={["schoolName"]} label="School Name" rules={[{ required: true }]}>
                        <Row>
                            <Col span={18}><Input /></Col>
                        </Row>
                    </Form.Item>
                </Col>
            </Row> */}


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
            </Button>
            </Form.Item>
        </Form >
    );
};



export default RegistrationForm;