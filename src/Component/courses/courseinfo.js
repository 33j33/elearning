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
      allDays: [],
      value1: "",
      value2: "",
      value3: "",
      showField: false,
      cardData: JSON.parse(sessionStorage.getItem("cardData")),
    };
    this.selectedDay = this.selectedDay.bind(this);
    this.onClicked = this.onClicked.bind(this);
  }

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
    this.setState({ days: value });
    console.log(this.state.cardData.course_schedule);
    for (const i in this.state.cardData.course_schedule) {
      console.log(this.state.cardData.course_schedule[i].day);
      if (this.state.cardData.course_schedule[i].day === value) {
        console.log(i.day);
        this.setState({
          timeSlot: this.state.cardData.course_schedule[i].time,
          showField: true,
        });
      }
    }
    console.log(this.state.showField);
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
    console.log(this.state.cardData);
    console.log(this.state.cardData.course_schedule);

    for (let i = 8; i < 22; i = i + 1) {
      this.children.push(
        <Option key={i + "-" + (Number(i) + 1)}>
          {i + "-" + (Number(i) + 1)}
        </Option>
      );
    }
  }
  componentWillMount() {
    console.log(this.props.data);
  }

  //For radio button group
  onChange1 = (e) => {
    console.log("radio checked1", e.target.value);
    this.setState({
      value1: e.target.value,
    });
  };

  onChange2 = (e) => {
    console.log("radio checked2", e.target.value);
    this.setState({
      value2: e.target.value,
    });
  };

  onChange3 = (e) => {
    console.log("radio checked3", e.target.value);
    this.setState({
      value3: e.target.value,
    });
  };

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
          <Panel header="Full Course" key="2">
            <p>
              Teacher's avalaible slots:
              <ul>
                {this.state.cardData.course_schedule.map((i) => (
                  <li>
                    {i.day}
                    {i.time.map((i) => (
                      <Radio.Group
                        onChange={this.onChange1}
                        value={this.state.value1}
                        style={{ marginLeft: 30 }}
                      >
                        <Radio value={1}>{i}</Radio>
                      </Radio.Group>
                    ))}
                  </li>
                ))}
              </ul>
            </p>
            <p>
              Course Fees: Rs.{this.state.cardData.course_price}
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 15 }}
              >
                Pay
              </Button>
            </p>
          </Panel>
          <Panel header="Half Course" key="3" style={{ marginTop: 10 }}>
            <Row>Choose slots here:</Row>
            {/* {this.state.allDays.map((day, index) => {
              return ( */}
            <Row justify="space-between">
              <Col span={9}>
                {/* <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    > */}
                <Select style={{ width: 200 }} onChange={this.handleChange}>
                  {this.state.cardData.course_schedule.map((i) => (
                    <Option value={i.day}>{i.day}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={9}>
                {this.state.showField ? (
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
              <Col>
                {" "}
                Course Fees: Rs.{this.state.cardData.course_price}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 15 }}
                >
                  Pay
                </Button>
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
