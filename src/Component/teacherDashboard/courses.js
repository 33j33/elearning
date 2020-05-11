import React, { Component } from "react";
import { Input, Row, Col, Button, Typography, Collapse } from "antd";
import { Modal, Select, Form } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const successForCourses = () => {
  message.success("Succesfully Added a course");
};
const { Option } = Select;

const { Text } = Typography;
const { Panel } = Collapse;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
      timeSlot: [],
      days: "",
      allDays: [],
      teacher_name:"",
      teacher_mobile:"",
      teacher_email:""
    };
  }
  formRef = React.createRef();

  setModal1Visible = () => {
    this.setState({ coursesModal: true });
  };

  onFinishCourseSelection = (values) => {
    console.log(values);
 
    const databody = {
      course_schedule: this.final_selectedtime,
      course_price: values.course_price,
      course_name: values.course_name,
      course_duration: values.course_duration,
      course_description: values.course_description,
      teacher_name: this.state.teacher_name,
      teacher_email: this.state.teacher_email,
      teacher_mobile: this.state.teacher_mobile,
    };
    axios
      .post("https://elearningserver.herokuapp.com/teacher/addCourse", databody)
      .then((response) => {
        console.log(response);
        this.formRef.current.resetFields();
        this.setState({ 
          coursesModal: false,
          timeSlot:[],
          days:"",
          allDays:[] });
        this.final_selectedtime=[]
        successForCourses();

      })
      .catch((error) => {
        console.log(error);
        // errorForRegistration();
      });
  };

  onFinishFailedCourseSelection = (errorInfo) => {
    console.log(errorInfo);
  };

  // @DESC SELECTED COURSE DAYS AND TIME SLOTS
  handleAdd = () => {
    this.setState({ allDays: [...this.state.allDays, ""] });
  };
  removeRow = (index) => {
    this.state.allDays.splice(index, 1);
    this.setState({ allDays: this.state.allDays });
    this.final_selectedtime.pop(index);
  };

  selectedDay = (e) => {
    console.log(e);
    this.setState({ days: e });
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({ timeSlot: value });
  };

  final_selectedtime = [];
  onClicked = () => {
    var courseSchedule = {
      day: this.state.days,
      time: this.state.timeSlot,
    };

    this.final_selectedtime.push(courseSchedule);
    console.log(this.final_selectedtime);
  }

  children = []
  componentDidMount() {
    let teacherEmail;
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(currentUser);
    this.setState({ teacher_name: currentUser.username, teacher_mobile: currentUser.phone, teacher_email: currentUser.email })


    teacherEmail = currentUser.email;
    const headers = { "x-auth-token": currentUser.token };
    axios
      .get(
        `https://elearningserver.herokuapp.com/teacher/addedCourseDetails/${teacherEmail}`,
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ coursesArray: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
    for (let i = 8; i < 22; i = i + 1) {
      this.children.push(
        <Option key={i + "-" + (Number(i) + 1)}>
          {i + "-" + (Number(i) + 1)}
        </Option>
      );
    }
  }
  showModalForTeachers = () => {
    this.showTeacherModal();
  };
  render() {
    return (

      <div

      >
        
        <Row justify="space-around">
          <Col>
            <Button
              icon={
                <PlusCircleTwoTone
                  style={{
                    position: "absolute",
                    left: "5%",
                    top: "25%",
                  }}
                />
              }
              onClick={this.setModal1Visible}
            >
              <Text strong style={{ paddingLeft: "8%" }}>
                Add Course
                      </Text>
            </Button>
          </Col>

        </Row>
        <br />
        {this.state.coursesArray.map((i) => (
          <Row justify="center" style={{ marginBottom: 10 }}>
            <Col span={20}>
              <Collapse>
                <Panel key={i._id} header={i.course_name}>
                  <p>{i.course_description}</p>
                  <p>Course Price: {i.course_price}</p>
                  <p>Course Duration: {i.course_duration}</p>
                  {i.course_schedule.map((j) => (
                    <p>
                      {j.day} -- {j.time + ","}
                    </p>
                  ))}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        ))}

        <Modal
          width={600}
          title="Add Courses"
          style={{ top: 20 }}
          visible={this.state.coursesModal}
          footer={[]}
          onCancel={() => this.setState({ coursesModal: false })}
        >
          <Form
                          ref={this.formRef}

            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinishCourseSelection}
            onFinishFailed={this.onFinishFailedCourseSelection}
            size="medium"
          >
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
                  name="course_description"
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
            <Row justify="space-between">
              Course Schdedule
              <PlusCircleOutlined onClick={this.handleAdd} />
            </Row>
            {this.state.allDays.map((index) => {
              return (
                <Row justify="space-between" key={index}>
                  <Col span={7}>
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
                  <Col span={15}>
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
            <Row justify="center">
              <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>

    );
  }
}

export default Courses;
