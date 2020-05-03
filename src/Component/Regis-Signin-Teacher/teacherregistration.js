import React, { Component } from "react";
import { Modal, Tabs, Select, Row, Col, Form, Input, Button } from "antd";
import { LoginOutlined, UserAddOutlined, PlusCircleOutlined,DeleteOutlined  } from "@ant-design/icons";



const { TabPane } = Tabs;
const { Option } = Select;

class Teacherregistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      timeSlot: [],
      days: "",
      allDays: []
    };
    this.showModal = this.showModal.bind(this);
    this.selectedDay = this.selectedDay.bind(this);
    this.onClicked = this.onClicked.bind(this);
  }


  //@DESC MODAL OPERATIONS
  showModal = () => {
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

  //@DESC ADD OR REMOVE COURSE SCHEDULE ROW
  handleAdd = () => {
    this.setState({ allDays: [...this.state.allDays, ""] })
  };
  removeRow = (index) => {
    this.state.allDays.splice(index, 1)
    this.setState({ allDays: this.state.allDays })
    this.final_selectedtime.pop(index)
    console.log(this.final_selectedtime);
  }


  //SELECTED DAYS AND TIME SLOTS
  selectedDay(e) {
    console.log(e);
    this.setState({ days: e });
  }

  handleChange = (value) => {
    console.log(value)
    this.setState({ timeSlot: value })
  }

  final_selectedtime = [];
  onClicked() {
    var courseSchedule = {
      courseDay: this.state.days,
      courseTime: this.state.timeSlot,
    };
    this.final_selectedtime.push(courseSchedule);
    console.log(this.final_selectedtime);
  }

children=[]
  componentDidMount() {
    for (let i = 8; i < 22; i = i + 1) {
      this.children.push(
        <Option key={i + "-" + (Number(i) + 1)}>{i + "-" + (Number(i) + 1)}</Option>
      );
    }
  }
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
                      <Input placeholder="Password" />
                    </Form.Item>
                  </Col>
                </Row>
                {/* <Divider /> */}
                Add Course Details
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="course_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Course Name!",
                        },
                      ]}
                    >
                      <Input placeholder="Course Name" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="course_price"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input your Course Price!",
                        },
                      ]}
                    >
                      <Input placeholder="Course Price" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="course_duration"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Course Duration!",
                        },
                      ]}
                    >
                      <Input placeholder="Course Duration" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="description_of_course"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Description of Course!",
                        },
                      ]}
                    >
                      <Input placeholder="Description of Course" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>Course Schdedule</Row>
                <Button
                  onClick={this.handleAdd}
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
                {this.state.allDays.map((day, index) => {
                  return (
                    <Row justify="space-between" key={index}>
                      <Col span={9}>
                        <Select
                          placeholder="Select Day"
                          onChange={this.selectedDay}
                          style={{ width: "100%" }}
                        >
                          <Select.Option value="Monday">Monday</Select.Option>
                          <Select.Option value="Tuesday">Tuesday</Select.Option>
                          <Select.Option value="Wednesday">Wednesday</Select.Option>
                          <Select.Option value="Thursday">Thursday</Select.Option>
                          <Select.Option value="Friday">Friday</Select.Option>
                          <Select.Option value="Saturday">Saturday</Select.Option>
                          <Select.Option value="Sunday">Sunday</Select.Option>
                        </Select>
                      </Col>
                      <Col span={9}>
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Select Timeslots"
                          onChange={this.handleChange}
                          onBlur={this.onClicked}

                        >
                          {this.children}
                        </Select>
                      </Col>
                      <Col >
                        <Button onClick={() => this.removeRow(index)}><DeleteOutlined /></Button>
                      </Col>
                    </Row>
                  )
                })}

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

export default Teacherregistration;
