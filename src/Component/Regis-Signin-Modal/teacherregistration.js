import React, { Component } from "react";
import { Modal, Tabs, Select, Row, Col, Form, Input, Button } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { message, Space } from 'antd';



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

const successForCourses = () => {
  message.success('Succesfully Loggedin');
};
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
      allDays: [],
      coursesModal: false,
    };
    this.showModal = this.showModal.bind(this);
    this.selectedDay = this.selectedDay.bind(this);
    this.onClicked = this.onClicked.bind(this);
  }
  formRef = React.createRef();

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


    // @DESC SELECTED COURSE DAYS AND TIME SLOTS
    handleAdd = () => {
      this.setState({ allDays: [...this.state.allDays, ""] });
    };
    removeRow = (index) => {
      this.state.allDays.splice(index, 1);
      this.setState({ allDays: this.state.allDays });
      this.final_selectedtime.pop(index);
      console.log(this.final_selectedtime);
    };
  
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
        day: this.state.days,
        time: this.state.timeSlot,
      };
  
      this.final_selectedtime.push(courseSchedule);
      console.log(this.final_selectedtime);
    }
  
  
    setModal1Visible = () => {
      this.setState({ coursesModal: true });
    }
  
  // @desc Login for Teachers
  onFinish = (values) => {

    axios
      .post("https://elearningserver.herokuapp.com/teacherlogin", values)
      .then(response => {
        console.log(response);
        this.formRef.current.resetFields()
        successForlogin();
        this.setState({
          visible: false
        });
      }).catch(error => {
        console.log(error.response)
        errorForlogin()
      });
  };


  // @desc  Course Add teacher operations
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  onFinishCourseSelection=(values)=>{
    console.log(values)
    this.setState({course_name:values.course_name,course_duration:values.course_duration,
      course_price:values.course_price,course_description:values.course_description})
      this.setState({ coursesModal: false });
      successForCourses();

  }
  
  onFinishFailedCourseSelection=(errorInfo)=>{
    console.log(errorInfo)
  }
  // @desc  Registering teacher operations
  onFinishRegis = (values) => {
    console.log("success", values);
    console.log(this.final_selectedtime);

    axios
      .post("https://elearningserver.herokuapp.com/registerteacher",
        values
      )
      .then(response => {
        console.log(response);
        const databody = {
          course_schedule: this.final_selectedtime,
          course_price: this.state.course_price,
          course_name: this.state.course_name,
          course_duration: this.state.course_duration,
          course_description: this.state.course_description,
          teacher_name:values.username,
          teacher_email:values.email,
          teacher_mobile:values.mobile
        }
        console.log(databody)
        axios
        .post("https://elearningserver.herokuapp.com/addCourse", databody
        )
        .then(response => {
          console.log(response);
          this.formRef.current.resetFields();
          this.setState({
            visible: false,
          });
          successForregistration();
  
        })
        .catch(error => {
          console.log(error)
          errorForRegistration()
        });
      })
      .catch(error => {
        console.log(error.response)
      });
   
  

  };

  onFinishFailedRegis = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  

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
                {/* <Divider /> */}
                <Row>
                  <Button onClick={this.setModal1Visible}>Add Course Details</Button>
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

        <Modal
          width={600}
          title="Add Courses"
          style={{ top: 20 }}
          visible={this.state.coursesModal}
          onOk={() => this.setState({ coursesModal: false })}
          onCancel={() => this.setState({ coursesModal: false })}
        >
          <Form
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
            {this.state.allDays.map((day, index) => {
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
                      <Select.Option value="Wednesday">
                        Wednesday
                          </Select.Option>
                      <Select.Option value="Thursday">
                        Thursday
                          </Select.Option>
                      <Select.Option value="Friday">Friday</Select.Option>
                      <Select.Option value="Saturday">
                        Saturday
                          </Select.Option>
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

export default Teacherregistration;
