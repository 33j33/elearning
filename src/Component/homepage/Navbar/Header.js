import React, { Component } from "react";
import { Modal, Tabs, Select, Row, Col, Form, Input, Button } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  StepBackwardOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import { Nav, Navbar } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Link } from "react-router-dom";
import { InputNumber } from "antd";
import { Spin } from "antd";

const successForregistration = () => {
  message.success("Succesfully Registered Login to Continue");
};

const errorForRegistration = () => {
  message.error("Registration Failed");
};

const successForlogin = () => {
  message.success("Succesfully Loggedin");
};

const errorForlogin = () => {
  message.error("Invalid Credentials");
};
const successForCourses = () => {
  message.success("Succesfully Added a course");
};
const logoutMessage = () => {
  message.success("Succesfully Logged out");
};
const { TabPane } = Tabs;
const { Option } = Select;
class header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      timeSlot: [],
      days: "",
      allDays: [],
      coursesModal: false,
      visibleModalForStudents: false,
      showField: false,
      username: "",
      loading: false,
      showSubmitButton: false,
      hour_based_course_price:"",
      full_course_price:""
    };
    this.showModal = this.showModal.bind(this);
    this.selectedDay = this.selectedDay.bind(this);
    this.onClicked = this.onClicked.bind(this);
  }
  formRef = React.createRef();

  //Onclicking Logout
  onClickLogout = () => {
    window.localStorage.clear();
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (!currentUser) {
      this.setState({ showField: false });
      logoutMessage();
      this.props.history.push("/");
    } else {
      console.log("log out failed");
    }
  };
  gotoProfile = () => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (currentUser.studentid) {
      this.props.history.push("/student/dashboard");
    } else {
      this.props.history.push("/teacher/dashboard");
    }
  };

  gotocourses = () => {
    this.props.history.push("/allcourses");
  };
  gotoHome = () => {
    this.props.history.push("/");
  };
  showModalForTeachers = () => {
    this.showModal();
  };

  showModalForStudents = () => {
    this.showSModalStud();
  };

  //   Students Modal
  showSModalStud = () => {
    this.setState({
      visibleModalForStudents: true,
    });
  };

  //BUTTONS FOR MODAL
  handleOkStud = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visibleModalForStudents: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancelStud = () => {
    console.log("Clicked cancel button");
    this.setState({
      visibleModalForStudents: false,
    });
  };

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

  removeRow = (e) => {
    console.log(e.target.value);
    this.state.allDays.splice(e.target.value, 1);
    this.setState({ allDays: this.state.allDays });
    this.final_selectedtime.splice(e.target.value, 1);
    console.log(this.final_selectedtime);
  };
  currentDay = "";
  getselectedday = (day) => {
    this.currentDay = day;
    console.log(day);
  };
  selectedDay(e, index) {
    // this.currentDay = e;
    this.state.allDays[index] = e;
    this.setState({ allDays: this.state.allDays });
    console.log(this.state.allDays);
    this.setState({ days: e });
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({ timeSlot: value });
    var courseSchedule = {
      day: this.currentDay,
      time: value,
    };
    console.log(this.courseSchedule);
    for (const i in this.final_selectedtime) {
      if (this.final_selectedtime[i].day === this.currentDay) {
        console.log(i);
        this.final_selectedtime.splice(i, 1, courseSchedule);
        console.log(this.final_selectedtime);
        return;
      }
    }

    this.final_selectedtime.push(courseSchedule);
    console.log(this.final_selectedtime);
  };

  final_selectedtime = [];

  onClicked(i) {
    console.log(i, this.state.days);
    // var courseSchedule = {
    //   day: this.state.days,
    //   time: this.state.timeSlot,
    // };
    // console.log(this.courseSchedule);
    // for (const i in this.final_selectedtime) {
    //   if (this.final_selectedtime[i].day === this.state.days) {
    //     this.final_selectedtime.splice(i, 1, courseSchedule);
    //     console.log(this.final_selectedtime);
    //     return;
    //   }
    // }

    // this.final_selectedtime.push(courseSchedule);
    // console.log(this.final_selectedtime);
  }

  setModal1Visible = () => {
    this.setState({ coursesModal: true });
  };

  // @desc Login for Teachers
  onFinishTeacher = (values) => {
    this.setState({ loading: true });

    axios
      .post("https://elearningserver.herokuapp.com/teacherlogin", values)
      .then((response) => {
        console.log(response);
        this.formRef.current.resetFields();
        successForlogin();
        this.setState({
          visible: false,
          loading: false,
        });
        const token = response.data.token;
        const email = response.data.email;
        const phone = response.data.mobile;
        const username = response.data.username;
        const teacherid = response.data.teacherid;

        window.localStorage.setItem(
          "currentUser",
          JSON.stringify({ token, email, phone, username, teacherid })
        );
        this.setState({ showField: true, username: username });
        this.props.history.push("teacher/dashboard");
      })
      .catch((error) => {
        this.setState({ loading: false });
        if (error.response !== undefined) {
          console.log(error.response);
          errorForlogin();
        }
      });
  };

  // @desc  Course Add teacher operations
  onFinishFailedTeacher = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onFinishCourseSelection = (values) => {
    console.log(values);
    this.setState({ showSubmitButton: true });
    this.setState({
      course_name: values.course_name,
      course_duration: values.course_duration,
      full_course_price: values.full_course_price,
      hour_based_course_price:values.hour_based_course_price,
      course_description: values.course_description,
    });
    this.setState({ coursesModal: false });
    successForCourses();
  };

  onFinishFailedCourseSelection = (errorInfo) => {
    console.log(errorInfo);
  };
  // @desc  Registering teacher operations
  onFinishRegisTeacher = (values) => {
    this.setState({ loading: true });
    axios
      .post("https://elearningserver.herokuapp.com/registerteacher", values)
      .then((response) => {
        console.log(response);
        const databody = {
          course_schedule: this.final_selectedtime,
          full_course_price: this.state.full_course_price,
          hour_based_course_price:this.state.hour_based_course_price,
          course_name: this.state.course_name,
          course_duration: this.state.course_duration,
          course_description: this.state.course_description,
          teacher_name: values.username,
          teacher_email: values.email,
          teacher_mobile: values.mobile,
        };
        axios
          .post(
            "https://elearningserver.herokuapp.com/teacher/addCourse",
            databody
          )
          .then((response) => {
            console.log(response);
            this.formRef.current.resetFields();
            this.setState({
              visible: false,
              loading: false,
            });
            successForregistration();
          })
          .catch((error) => {
            this.setState({ loading: false });
            console.log(error);
            errorForRegistration();
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onFinishFailedRegisTeacher = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //Login for students
  onFinish = (values) => {
    this.setState({ loading: true });

    axios
      .post("https://elearningserver.herokuapp.com/studentlogin", values)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.formRef.current.resetFields();
        successForlogin();
        this.setState({
          visible: false,
        });
        const token = response.data.token;
        const email = response.data.email;
        const phone = response.data.mobile;
        const username = response.data.username;
        const studentid = response.data.studentid;
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify({ token, email, phone, username, studentid })
        );
        this.setState({
          showField: true,
          username: username,
          visibleModalForStudents: false,
        });
        this.props.history.push("student/dashboard");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error.response);
        errorForlogin();
      });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //for Registering Student
  onFinishRegisStudent = (values) => {
    console.log(values);
    this.setState({ loading: true });
    axios
      .post("https://elearningserver.herokuapp.com/registerstudent", values)
      .then((response) => {
        console.log(response);
        this.setState({
          visible: false,
          loading: false,
        });
        successForregistration();
        this.formRef.current.resetFields();
      })
      .catch((error) => {
        this.setState({ loading: false });

        console.log(error.response);
        errorForRegistration();
      });
  };

  onFinishFailedRegisStudent = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  checkifUserloggedIn() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (currentUser) {
      this.setState({ showField: true, username: currentUser.username });
    }
  }
  children = [];

  componentDidMount() {
    this.checkifUserloggedIn();
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
        <div style={{ position: "fixed", top: "0%", width: "100%", zIndex: "100" }}>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/">
              {" "}
              <Navbar.Brand onClick={this.gotoHome} style={{ cursor: "pointer", color: "#00f9ff", border: "2px solid white", padding: "2px 4px", fontWeight: "bolder" }}>
                TURNSKILL 1 to 1
            </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav >
                <Nav.Link>About Us</Nav.Link>
                <Nav.Link onClick={this.gotocourses}>
                  <Link to="/">All Courses</Link>{" "}
                </Nav.Link>
                {this.state.showField ? (
                  <Row>
                    <Nav.Link onClick={this.gotoProfile}>
                      {this.state.username}
                    </Nav.Link>
                    <Nav.Link onClick={this.onClickLogout}>Logout </Nav.Link>
                  </Row>
                ) : (
                    <Row>
                      <Nav.Link onClick={this.showModalForTeachers}>
                        For Teachers
                  </Nav.Link>
                      <Nav.Link onClick={this.showModalForStudents}>
                        For Students
                  </Nav.Link>
                    </Row>
                  )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        {/* @ Desc STUDENTS MODALS */}
        <Modal
          width={600}
          style={{ top: 20 }}
          visible={this.state.visibleModalForStudents}
          onOk={this.handleOkStud}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancelStud}
          footer={[]}
        >
          <Spin spinning={this.state.loading}>
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
                            type: "email",
                            required: true,
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
                  onFinish={this.onFinishRegisStudent}
                  onFinishFailed={this.onFinishFailedRegisStudent}
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
                        <InputNumber
                          placeholder="Mobile"
                          style={{ width: "100%" }}
                        />
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
                            type: "email",
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
          </Spin>
        </Modal>

        {/* @ DESC TEACHERS MODALS */}
        <Modal
          width={600}
          style={{ top: 20 }}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Spin spinning={this.state.loading}>
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
                  onFinish={this.onFinishTeacher}
                  onFinishFailed={this.onFinishFailedTeacher}
                >
                  <Row justify="center">
                    <Col span={24}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
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
                  onFinish={this.onFinishRegisTeacher}
                  onFinishFailed={this.onFinishFailedRegisTeacher}
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
                        <InputNumber
                          placeholder="Mobile"
                          style={{ width: "100%" }}
                        />
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
                            type: "email",
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
                    <Button onClick={this.setModal1Visible}>
                      Add Course Details
                    </Button>
                  </Row>

                  <br />
                  <Row justify="center">
                    <Col>
                      {this.state.showSubmitButton ? (
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      ) : null}
                    </Col>
                  </Row>
                </Form>{" "}
              </TabPane>
            </Tabs>
          </Spin>
        </Modal>

        <Modal
          width={600}
          title="Add Courses"
          style={{ top: 20 }}
          visible={this.state.coursesModal}
          footer={[]}
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
                  name="full_course_price"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full Course Price!",
                    },
                  ]}
                >
                  <Input placeholder="Full Course Price" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col span={11}>
                <Form.Item
                  name="hour_based_course_price"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Hour Based Course Price!",
                    },
                  ]}
                >
                  <Input placeholder="Hour Based Course Price" />
                </Form.Item>
              </Col>
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
            </Row>
            <Row>
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
                  <Input.TextArea placeholder="Description of Course" />
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
                      onChange={(e) => this.selectedDay(e, index)}
                      value={day}
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
                      onFocus={() => this.getselectedday(day)}
                    >
                      {this.children}
                    </Select>
                  </Col>
                  <Col>
                    <Button value={index} onClick={this.removeRow}>
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
                    <StepBackwardOutlined />
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

export default withRouter(header);
