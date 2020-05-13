import React, { Component } from "react";
import { Select, Row, Col, Button, Radio, Card, Collapse } from "antd";
import axios from "axios";
const { Option } = Select;
const { Panel } = Collapse;

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
    };

    this.onChange1 = this.onChange1.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.submitschedule = this.submitschedule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitschedulehalf = this.submitschedulehalf.bind(this);
  }

  // handleAdd = () => {
  //   this.setState({ allDays: [...this.state.allDays, ""] });
  // };

  // removeRow = (index) => {
  //   this.state.allDays.splice(index, 1);
  //   this.setState({ allDays: this.state.allDays });
  //   this.final_selectedtime.pop(index);
  //   console.log(this.final_selectedtime);
  // };

  //SELECTED DAYS AND TIME SLOTS
  selectedDay(e) {
    console.log(e);
    this.setState({ days: e });
  }
  halftimeslot = "";
  handleChange1 = (value) => {
    this.halftimeslot = value;
    console.log(value, "t", this.halftimeslot);
  };

  halfcourseday = "";
  showField = false;
  handleChange = (value) => {
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

  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(currentUser);
    if (currentUser) {
      this.setState({
        student_name: currentUser.username,
        student_email: currentUser.email,
        student_mobile: currentUser.mobile,
        student_id: currentUser.studentid,
        token: currentUser.token,
      });
    }
  }

  //For radio button group
  scheduleArray = [];
  selectedday = "";

  getSchedule = (data) => {
    this.selectedday = data;

    console.log(data);
  };
  getday = (day) => {
    console.log("day", day);

    return day;
    this.setState({ days: day });
  };
  onChange1 = (e) => {
    console.log("r", this.selectedday);
    console.log(e);
    for (const i in this.scheduleArray) {
      if (this.scheduleArray[i].day === this.selectedday) {
        console.log(this.scheduleArray[i]);
        this.scheduleArray.pop(this.scheduleArray[i], 1);
      }
    }
    const body = {
      day: this.selectedday,
      time: e.target.value,
    };

    console.log(body);
    this.scheduleArray.push(body);
    console.log(e.target);
    console.log("radio checked1", this.scheduleArray);
  };
  submitschedule() {
    console.log(this.scheduleArray);
    console.log(this.state.coursetype);
    this.setState({ showButton: true });
    this.setState({ showPanel: false });
    const dataBody = {
      student_id: this.state.student_id,
      student_name: this.state.student_name,
      student_mobile: this.state.student_mobile,
      student_email: this.state.student_email,
      course_name: this.state.cardData.course_name,
      course_type: this.state.coursetype,
      course_price: "price",
      teacher_name: this.state.cardData.teacher_name,
      teacher_mobile: this.state.cardData.teacher_mobile,
      teacher_email: this.state.cardData.teacher_email,
      selected_course_schedule: this.scheduleArray,
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
      })
      .catch((error) => {
        if (error.response !== undefined) {
          console.log(error.response);
        }
      });
  }
  schedulehalfarray = [];

  submitschedulehalf() {
    console.log("A", this.halfcourseday, this.halftimeslot);
    const data = {
      day: this.halfcourseday,
      time: this.halftimeslot,
    };
    this.schedulehalfarray.push(data);
    const dataBody = {
      student_id: this.state.student_id,
      student_name: this.state.student_name,
      student_mobile: this.state.student_mobile,
      student_email: this.state.student_email,
      course_name: this.state.cardData.course_name,
      course_type: "Half",
      course_price: "price",
      teacher_name: this.state.cardData.teacher_name,
      teacher_mobile: this.state.cardData.teacher_mobile,
      teacher_email: this.state.cardData.teacher_email,
      selected_course_schedule: this.schedulehalfarray,
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
      })
      .catch((error) => {
        if (error.response !== undefined) {
          console.log(error.response);
        }
      });
  }
  //For collapse
  callback = (e) => {
    console.log(e);
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: 15 }}>
          {this.state.cardData.course_name}
        </h1>
        <Row justify="center">
          <Card
            title="Course Description"
            style={{
              fontSize: 15,
              minHeight: 200,
              minWidth: 700,
            }}
          >
            <p>
              <ul>
                <li>{this.state.cardData.course_description}</li>
              </ul>
            </p>
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
        >
          <Panel
            header="Full Course"
            key="2"
            onClick={(this.state.coursetype = "Full")}
          >
            Teacher's avalaible slots:
            <ul>
              {this.state.cardData.course_schedule.map((i) => (
                <li onFocus={() => this.getSchedule(i.day)}>
                  {i.day}
                  <Radio.Group
                    onChange={this.onChange1}
                    onClick={() => this.getday(i.day)}
                    style={{ marginLeft: 30 }}
                    // value={j}
                    options={i.time}
                  ></Radio.Group>
                </li>
              ))}
            </ul>
            <Row>
              <Button onClick={this.submitschedule}>submit</Button>
            </Row>
            Course Fees: Rs.{this.state.cardData.course_price}
            {this.state.showButton ? (
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 15 }}
              >
                Pay
              </Button>
            ) : null}
          </Panel>
          <Panel header="Half Course" key="3" style={{ marginTop: 10 }}>
            <Row>Choose slots here:</Row>

            <Row justify="space-between">
              <Col span={9}>
                <Select
                  style={{ width: 200 }}
                  value={this.state.days}
                  onChange={this.handleChange}
                >
                  {this.state.cardData.course_schedule.map((i) => (
                    <Option value={i.day}>{i.day}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={9}>
                {this.showField ? (
                  <Select style={{ width: 200 }} onChange={this.handleChange1}>
                    {this.state.timeSlot.map((j) => (
                      <Option value={j}>{j}</Option>
                    ))}
                  </Select>
                ) : null}
              </Col>
            </Row>
            <br />
            <Row>
              <Button onClick={this.submitschedulehalf}>submit</Button>
            </Row>

            <Row>
              <Col>
                {" "}
                Course Fees: Rs.{this.state.cardData.course_price}
                {this.state.showButton ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: 15 }}
                  >
                    Pay
                  </Button>
                ) : null}
              </Col>
            </Row>
          </Panel>
        </Collapse>
        ,
      </div>
    );
  }
}

export default courseinfo;
