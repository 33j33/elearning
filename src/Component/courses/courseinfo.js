import React, { Component } from "react";
import { Select, Row, Col, Button, Radio, Card, Collapse } from "antd";
import axios from "axios";
import { message } from "antd";
import { Spin } from "antd";

const { Option } = Select;
const { Panel } = Collapse;

const successPaymentMessage = (message) => {
  message.success(message);
};
const errormessage = (mssg) => {
  message.error(mssg);
};

class courseinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlot: [],
      days: "",
      selectedday: "",
      time: "",
      allDays: [],
      showButton: false,
      showPanel: true,
      showField: false,
      cardData: JSON.parse(sessionStorage.getItem("cardData")),
      selectedTime: "",
      student_name: "",
      student_email: "",
      student_mobile: "",
      student_id: "",
      token: "",
      paymentdone: false,
      showButtonhalf: false,
      paymentdonehalf: false,
      loading: false,
    };

    this.getFullCourseTimeSlot = this.getFullCourseTimeSlot.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.buyFullCourse = this.buyFullCourse.bind(this);
    this.payfullCourse = this.payfullCourse.bind(this);
    this.payhalfcourse = this.payhalfcourse.bind(this);
    this.getHourBasedCourseDay = this.getHourBasedCourseDay.bind(this);
  }

  halfcourseday = "";
  showField = false;
  halftimeslot = "";
  //For radio button group
  FullCourseTimeSlotArray = [];
  selectedday = "";

  getHourBasedCourseTimeSlot = (value) => {
    this.halftimeslot = value;
    console.log(value, "t", this.halftimeslot);
  };

  getHourBasedCourseDay = (value) => {
    console.log(value);
    this.halfcourseday = value;
    console.log("day", this.halfcourseday, "t", this.halftimeslot);
    for (const i in this.state.cardData.course_schedule) {
      console.log(this.state.cardData.course_schedule[i].day);
      if (this.state.cardData.course_schedule[i].day === value) {
        this.setState({
          timeSlot: this.state.cardData.course_schedule[i].time,
          showField: true,
        });
        this.showField = true;
      }
    }
    this.setState({ days: value });
    console.log("day", this.state.days);
  };

  getSchedule = (data) => {
    this.selectedday = data;
  };
  getday = (day) => {
    return day;
  };

  getFullCourseTimeSlot = (e) => {
    const body = {
      day: this.selectedday,
      time: e.target.value,
    };
    console.log(body);
    console.log("A", this.FullCourseTimeSlotArray, this.selectedday);
    for (const i in this.FullCourseTimeSlotArray) {
      if (this.FullCourseTimeSlotArray[i].day === this.selectedday) {
        this.FullCourseTimeSlotArray.splice(i, 1, body);
        return;
      }
    }

    this.FullCourseTimeSlotArray.push(body);

    console.log(this.FullCourseTimeSlotArray);
  };

  buyFullCourse() {
    this.setState({ showButton: true });
    this.setState({ showPanel: false });
  }
  //Pay full course
  payfullCourse() {
    this.setState({ loading: true });
    const dataBody = {
      student_id: this.state.student_id,
      student_name: this.state.student_name,
      student_mobile: this.state.student_mobile,
      student_email: this.state.student_email,
      course_name: this.state.cardData.course_name,
      course_type: this.state.coursetype,
      course_price: this.state.cardData.full_course_price,
      teacher_name: this.state.cardData.teacher_name,
      teacher_mobile: this.state.cardData.teacher_mobile,
      teacher_email: this.state.cardData.teacher_email,
      selected_course_schedule: this.FullCourseTimeSlotArray,
      course_id: this.state.cardData.course_id,
    };
    const headers = { "x-auth-token": this.state.token };
    axios
      .post(
        "https://elearningserver.herokuapp.com/student/selectedcourse",
        dataBody,
        { headers }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          showButton: false,
          loading: false,
          paymentdone: false,
        });
        var successMessage = "Full Course Payment Success";
        successPaymentMessage(successMessage);
      })
      .catch((error) => {
        var errorMessage;
        this.setState({ loading: false });
        if (error.message === "Request failed with status code 401") {
          errorMessage = "Login to buy the course";
        } else {
          errorMessage = "Course already bought";
        }
        errormessage(errorMessage);
      });
  }

  hourBasedCourseDataArray = [];
  buyHourBasedCourse = () => {
    this.setState({ showButtonhalf: true });
  };
  payhalfcourse = () => {
    this.setState({ loading: true });
    const data = {
      day: this.halfcourseday,
      time: this.halftimeslot,
    };
    this.hourBasedCourseDataArray.push(data);
    const dataBody = {
      student_id: this.state.student_id,
      student_name: this.state.student_name,
      student_mobile: this.state.student_mobile,
      student_email: this.state.student_email,
      course_name: this.state.cardData.course_name,
      course_type: "Hour-Based",
      course_price: this.state.cardData.hour_based_course_price,
      teacher_name: this.state.cardData.teacher_name,
      teacher_mobile: this.state.cardData.teacher_mobile,
      teacher_email: this.state.cardData.teacher_email,
      selected_course_schedule: this.hourBasedCourseDataArray,
      course_id: this.state.cardData.course_id,
    };

    const headers = { "x-auth-token": this.state.token };
    axios
      .post(
        "https://elearningserver.herokuapp.com/student/selectedcourse",
        dataBody,
        { headers }
      )
      .then((response) => {
        console.log(response);
        var successMessage = "Half Course Payment Success";
        successPaymentMessage(successMessage);
        this.setState({
          showButtonhalf: false,
          paymentdonehalf: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        var errorMessage;
        if (error.message === "Request failed with status code 401") {
          errorMessage = "Login to buy the course";
        } else {
          errorMessage = "Course already bought";
        }
        errormessage(errorMessage);
      });
  };

  componentDidMount() {
    //     const cardData = JSON.parse(window.localStorage.getItem("currentUser"));
    // if(!cardData){
    // this.props.history.push("/")
    // }
    // else{
    // this.setState({cardData:JSON.parse(sessionStorage.getItem("cardData"))})
    // }
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (currentUser) {
      this.setState({
        student_name: currentUser.username,
        student_email: currentUser.email,
        student_mobile: currentUser.phone,
        student_id: currentUser.studentid,
        token: currentUser.token,
      });
    }
  }

  render() {
    return (
      <div style={{ minHeight: 570, marginTop: "80px" }}>
        <h1 style={{ textAlign: "center", marginTop: 15 }}>
          {this.state.cardData.course_name}
        </h1>
        <Spin spinning={this.state.loading}>
          <Row justify="center">
            <Card
              title="Course Description"
              style={{
                fontSize: 15,
                minHeight: 200,
                minWidth: 700,
              }}
              extra={<h6>By Mr.{this.state.cardData.teacher_name}</h6>}
            >
              <ul>
                <li>{this.state.cardData.course_description}</li>
              </ul>
            </Card>
          </Row>
          <Collapse
            style={{
              marginLeft: 300,
              marginRight: 300,
              marginTop: 20,
              fontSize: 15,
            }}
            defaultActiveKey={["1"]}
            onChange={this.callback}
            key={this.state.cardData._id}
          >
            <Panel
              header="Full Course"
              key="2"
              onClick={(this.state.coursetype = "Full")}
            >
              Teacher's avalaible slots:
              <ul>
                {this.state.cardData.course_schedule.map((i, index) => (
                  <li onFocus={() => this.getSchedule(i.day)} key={index}>
                    {i.day}
                    <Radio.Group
                      onChange={this.getFullCourseTimeSlot}
                      onClick={() => this.getday(i.day)}
                      style={{ marginLeft: 30 }}
                      options={i.time}
                    ></Radio.Group>
                  </li>
                ))}
              </ul>
              <Row>
                <Button onClick={this.buyFullCourse}>submit</Button>
              </Row>
              Course Fees: Rs.{this.state.cardData.full_course_price}
              {this.state.showButton ? (
                <Button
                  type="primary"
                  onClick={this.payfullCourse}
                  htmlType="submit"
                  style={{ marginLeft: 15 }}
                >
                  Pay
                </Button>
              ) : null}
              {this.state.paymentdone ? (
                <p style={{ color: "Red" }}>Paid Succesfully</p>
              ) : null}
            </Panel>

            <Panel header="Hour Based" key="3" style={{ marginTop: 10 }}>
              <Row>Choose slots here:</Row>

              <Row justify="space-between">
                <Col span={9}>
                  <Select
                    style={{ width: 200 }}
                    value={this.state.days}
                    onChange={this.getHourBasedCourseDay}
                    placeholder="Select Day"
                  >
                    {this.state.cardData.course_schedule.map((i, index) => (
                      <Option value={i.day} key={index}>
                        {i.day}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={9}>
                  {this.showField ? (
                    <Select
                      style={{ width: 200 }}
                      onChange={this.getHourBasedCourseTimeSlot}
                      placeholder="Select timeslot"
                    >
                      {this.state.timeSlot.map((j, index) => (
                        <Option value={j} key={index}>
                          {j}
                        </Option>
                      ))}
                    </Select>
                  ) : null}
                </Col>
              </Row>
              <br />
              <Row>
                <Button onClick={this.buyHourBasedCourse}>submit</Button>
              </Row>

              <Row>
                <Col>
                  {" "}
                  Course Fees: Rs.{this.state.cardData.hour_based_course_price}
                  {this.state.showButtonhalf ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: 15 }}
                      onClick={this.payhalfcourse}
                    >
                      Pay
                    </Button>
                  ) : null}
                  {this.state.paymentdonehalf ? (
                    <p style={{ color: "Red" }}>Paid Succesfully</p>
                  ) : null}
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Spin>
      </div>
    );
  }
}

export default courseinfo;
