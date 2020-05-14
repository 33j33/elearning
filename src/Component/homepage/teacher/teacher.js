import React, { Component } from "react";
import { Row, Col } from "antd";
import "./teacher.css";
class Teacher extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          backgroundColor: "mintcream",
          paddingTop: 30,
          paddingBottom: 50,
        }}
      >
        {/* <Row style={{ marginTop: 40 }} gutter={16}>
          <Col span={6} offset={2} className="gutter-row">
            <h3>REGISTER</h3>
            <br />
            Want to teach something? Just register with some details and add
            atleast one course you specialise in and we'll find the students for
            you!
          </Col>

          <Col span={6} offset={1} className="gutter-row">
            <h3>LOGIN AND UPDATE</h3>
            <br />
            Keep adding courses you'd love to teach. Choose the time slots that
            you are comfortable with to teach
          </Col>

          <Col span={6} offset={1} className="gutter-row">
            <h3>HAPPY TEACHING</h3>
            <br />
            Based on the courses you've added, you can check your schedule
            depending upon the time slot chosen by the student and voila!
          </Col>
        </Row> */}
        <div className="main-div">
          <div className="child-div">
            <h3>REGISTER</h3>
            <br />
            Want to teach something? Just register with some details and add
            atleast one course you specialise in and we'll find the students for
            you!
          </div>
          <div className="child-div">
            <h3>LOGIN AND UPDATE</h3>
            <br />
            Keep adding courses you'd love to teach. Choose the time slots that
            you are comfortable with to teach
          </div>
          <div className="child-div">
            <h3>HAPPY TEACHING</h3>
            <br />
            Based on the courses you've added, you can check your schedule
            depending upon the time slot chosen by the student and voila!
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
