import React, { Component } from "react";

import { Modal, Select, Row, Col, Form, Input, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      timeSlot: [],
      days: "",
      allDays: [],
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

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onFinishRegis = (values) => {
    console.log("success", values);
    // axios
    //   .post("https://elearningserver.herokuapp.com/registerteacher", {
    //     dataBody,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   });
  };

  onFinishFailedRegis = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //@DESC ADD OR REMOVE COURSE SCHEDULE ROW
  handleAdd = () => {
    this.setState({ allDays: [...this.state.allDays, ""] });
  };
  removeRow = (index) => {
    this.state.allDays.splice(index, 1);
    this.setState({ allDays: this.state.allDays });
    this.final_selectedtime.pop(index);
    console.log(this.final_selectedtime);
  };

  //SELECTED DAYS AND TIME SLOTS
  selectedDay(e) {
    console.log(e);
    this.setState({ days: e });
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({ timeSlot: value });
  };

  final_selectedtime = [];
  onClicked() {
    var courseSchedule = {
      courseDay: this.state.days,
      courseTime: this.state.timeSlot,
    };
    this.final_selectedtime.push(courseSchedule);
    console.log(this.final_selectedtime);
  }

  children = [];
  componentDidMount() {
    for (let i = 8; i < 22; i = i + 1) {
      this.children.push(
        <Option key={i + "-" + (Number(i) + 1)}>
          {i + "-" + (Number(i) + 1)}
        </Option>
      );
    }
  }
  render() {
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
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinishRegis}
            onFinishFailed={this.onFinishFailedRegis}
            size="medium"
          >
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
                      message: "Please input your Course Price!",
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
                  <Col>
                    <Button onClick={() => this.removeRow(index)}>
                      <DeleteOutlined />
                    </Button>
                  </Col>
                </Row>
              );
            })}
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
        </Modal>
      </div>
    );
  }
}

export default AddCourse;
