import React, { Component } from "react";
import { Select, Row, Col, Button, Radio, Card, Collapse } from "antd";

const { Option } = Select;
const { Panel } = Collapse;

class courseinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
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
    };
    this.selectedDay = this.selectedDay.bind(this);
    this.onClicked = this.onClicked.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.submitschedule = this.submitschedule.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange = (value) => {
    console.log(value);
    console.log(this.state.cardData.course_schedule);
    for (const i in this.state.cardData.course_schedule) {
      console.log(this.state.cardData.course_schedule[i].day);
      if (this.state.cardData.course_schedule[i].day === value) {
        this.setState({
          timeSlot: this.state.cardData.course_schedule[i].time,
          showField: true,
        });
      }
    }
    this.setState({ days: value });
    console.log("day", this.state.days);
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

  // componentDidMount() {
  //   console.log(this.state.cardData);
  //   console.log(this.state.cardData.course_schedule);

  //   for (let i = 8; i < 22; i = i + 1) {
  //     this.children.push(
  //       <Option key={i + "-" + (Number(i) + 1)}>
  //         {i + "-" + (Number(i) + 1)}
  //       </Option>
  //     );
  //   }
  // }
  //For radio button group
  scheduleArray = [];
  selectedday = "";
  getSchedule(day) {
    console.log("days is", day);
    this.setState({ days: day });
  }

  getday = (day) => {
    console.log("day", day);
    this.selectedday = day;
    this.setState({ days: day });
  };
  onChange1 = (e) => {
    console.log("r", this.selectedday);

    const body = {
      day: this.state.days,
      time: e.target.value,
    };
    this.scheduleArray.push(body);
    console.log(e.target);
    console.log("radio checked1", this.scheduleArray);
  };
  submitschedule() {
    this.setState({ showButton: true });
    this.setState({ showPanel: false });

    // axios
    // .post("https://elearningserver.herokuapp.com/teacherlogin", values)
    // .then((response) => {
    //   console.log(response);
    //   this.formRef.current.resetFields();
    //   successForlogin();
    //   this.setState({
    //     showButton: true,
    //   });

    //   window.localStorage.setItem(
    //     "currentUser",
    //     JSON.stringify({ token, email, phone, username, teacherid })
    //   );
    //   this.setState({ showField: true, username: username });
    //   this.props.history.push("teacher/dashboard");
    // })
    // .catch((error) => {
    //   if (error.response !== undefined) {
    //     console.log(error.response);
    //     errorForlogin();
    //   }
    // });
  }

  //For collapse
  callback = (e) => {
    console.log(e);
  };

  getSchedule = (data) => {
    console.log(data);
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
          <Panel header="Full Course" key="2">
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
          {this.state.showPanel ? (
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
                  {this.state.showField ? (
                    <Select
                      style={{ width: 200 }}
                      onChange={this.handleChange1}
                    >
                      {this.state.timeSlot.map((j) => (
                        <Option value={j}>{j}</Option>
                      ))}
                    </Select>
                  ) : null}
                </Col>
              </Row>
              <br />
              <Row>
                <Button onClick={this.submitschedule}>submit</Button>
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
          ) : null}
        </Collapse>
        ,
      </div>
    );
  }
}

export default courseinfo;
