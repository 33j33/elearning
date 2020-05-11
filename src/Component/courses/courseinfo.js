import React, { Component } from "react";
import { Select, Row, Col, Button, Radio, Card, Collapse } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

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
    console.log(this.state.cardData);

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
        <Card
          title="Course Description"
          style={{
            marginRight: 300,
            marginLeft: 300,
            marginTop: 20,
            fontSize: 15,
          }}
        >
          <p>
            {/* {this.state.cardData.course_description} */}
            <ul>
              <li>Unit 1: HTML essentials</li>
              <li>Unit 2: Semantics and Organisation</li>
              <li>Unit 3: Forms and Tables</li>
              <li>Unit 4: CSS essentials</li>
              <li>Unit 5: CSS Typography and Backgrounds</li>
              <li>Unit 6: Responsive Web Design</li>
            </ul>{" "}
          </p>
        </Card>
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
                <li>
                  Monday{" "}
                  <Radio.Group
                    onChange={this.onChange1}
                    value={this.state.value1}
                    style={{ marginLeft: 30 }}
                  >
                    <Radio value={1}>8:00-9:00</Radio>
                    <Radio value={2}>12:00-13:00</Radio>
                    <Radio value={3}>16:00-17:00</Radio>
                  </Radio.Group>
                </li>
                <li>
                  Wednesday{" "}
                  <Radio.Group
                    onChange={this.onChange2}
                    value={this.state.value2}
                    style={{ marginLeft: 8 }}
                  >
                    <Radio value={4}>10:00-11:00</Radio>
                    <Radio value={5}>11:00-12:00</Radio>
                  </Radio.Group>
                </li>
                <li>
                  Friday{" "}
                  <Radio.Group
                    onChange={this.onChange3}
                    value={this.state.value3}
                    style={{ marginLeft: 45 }}
                  >
                    <Radio value={6}>7:00-8:00</Radio>
                    <Radio value={7}>9:00-10:00</Radio>
                    <Radio value={8}>12:00-13:00</Radio>
                    <Radio value={9}>14:00-15:00</Radio>
                  </Radio.Group>
                </li>
              </ul>
            </p>
            <p>
              Course Fees: ₹2000
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 15 }}
              >
                Pay
              </Button>
            </p>
          </Panel>
          <Panel header="Half Course" key="3">
            <Row>
              Choose slots here:
              <Button
                onClick={this.handleAdd}
                style={{ marginLeft: 15, marginBottom: 16 }}
              >
                <PlusCircleOutlined />
              </Button>
            </Row>
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
            <Row>
              <Col>
                {" "}
                Course Fees: ₹1000
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
