import React, { Component } from "react";
import { Select, Row, Col, Button, Radio, Card, Collapse, message } from "antd";
import axios from "axios";
import { Spin } from "antd";
import "./courseinfo.css";

const { Option } = Select;
const { Panel } = Collapse;

const successPaymentMessage = () => {
  message.success(" Course Payment Success");
};
const errormessage = (errorMessage) => {
  message.error(errorMessage);
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
  };

  getHourBasedCourseDay = (value) => {
    this.halfcourseday = value;
    for (const i in this.state.cardData.course_schedule) {
      if (this.state.cardData.course_schedule[i].day === value) {
        this.setState({
          timeSlot: this.state.cardData.course_schedule[i].time,
          showField: true,
        });
        this.showField = true;
      }
    }
    this.setState({ days: value });
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
    for (const i in this.FullCourseTimeSlotArray) {
      if (this.FullCourseTimeSlotArray[i].day === this.selectedday) {
        this.FullCourseTimeSlotArray.splice(i, 1, body);
        return;
      }
    }

    this.FullCourseTimeSlotArray.push(body);
  };

  buyFullCourse() {
    this.setState({ showButton: true });
    this.setState({ showPanel: false });
  }
  //Pay full course
  payfullCourse = () => {
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
        this.props.history.push("/student/dashboard");
        successPaymentMessage();
      })
      .catch((error) => {
        console.log(error.message);
        var errorMessage;
        this.setState({ loading: false });
        if (error.message != undefined) {
          if (error.message === "Request failed with status code 401") {
            errorMessage = "Login to buy the course";
          } else {
            errorMessage = "Course already bought";
          }
        }
        errormessage(errorMessage);
      });
  };

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
        this.props.history.push("/student/dashboard");

        successPaymentMessage();
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
      <div style={{ minHeight: 570, marginTop: 80 }}>
        <h1 style={{ textAlign: "center", marginTop: 15, color: "#c64752" }}>
          {this.state.cardData.course_name}
        </h1>
        <Spin spinning={this.state.loading}>
          <Row justify="center">
            <Card
              title={<p style={{fontSize: 17, fontWeight: "bold", marginBottom: 0}}>By Mr.{this.state.cardData.teacher_name}</p>}
              style={{
                marginTop: 10,
                width: "55%",
                fontSize: 17,
                minHeight: 200,
              }}
              // /extra={<p>By Mr.{this.state.cardData.teacher_name}</p>}/
            >
              <p>Course Description:</p>
              <ul>
                <li>{this.state.cardData.course_description}</li>
              </ul>
            </Card>
          </Row>
          <Row justify="center" style={{paddingBottom: 50}}>
            <Collapse
              style={{
                width: "70%",
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
                Teacher's available slots:
                <ul>
                  {this.state.cardData.course_schedule.map((i, index) => (
                    <li onFocus={() => this.getSchedule(i.day)} key={index}>
                      <Row>
                      {i.day}
                       <Col className="radio">
                      <Radio.Group
                        onChange={this.getFullCourseTimeSlot}
                        onClick={() => this.getday(i.day)}
                        style={{ marginLeft: 30 }}
                        options={i.time}
                      ></Radio.Group></Col></Row>
                    </li>
                  ))}
                </ul>
                <Row className="submit1">
                  <Button onClick={this.buyFullCourse} style={{color:"#c64752", borderColor: "#c64752"}}>Submit</Button>
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

              <Panel header="Hour Based" key="3">
                <Row style={{marginBottom: 10}}>Choose slots here:</Row>

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
                <Row className="submit2">
                  <Button onClick={this.buyHourBasedCourse} style={{color:"#c64752", borderColor: "#c64752"}}>Submit</Button>
                </Row>

                <Row>
                  <Col>
                    {" "}
                    Course Fees: Rs.
                    {this.state.cardData.hour_based_course_price}
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
          </Row>
        </Spin>
      </div>
    );
  }
}

export default courseinfo;
