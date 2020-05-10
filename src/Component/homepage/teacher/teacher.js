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
        <Row style={{ marginTop: 40 }}>
          <Col span={6} offset={2} className="col-step-1">
            <h3>STEP 1</h3>
            <br />
            Teacher should register and login where they can enter their details
            Teacher should register and login where they can enter their details
            Teacher should register and login where they can enter their details
          </Col>

          <Col span={6} offset={1} className="col-step-2">
            <h3>STEP 2</h3>
            <br />
            Teacher can enter the details they want and schedule their classes
            Teacher can enter the details they want and schedule their classes
            Teacher can enter the details they want and schedule their classes
          </Col>

          <Col span={6} offset={1} className="col-step-3">
            <h3>STEP 3</h3>
            <br />
            Teacher and students can connect on the platform described by the
            teacher Teacher and students can connect on the platform described
            by the teacher Teacher and students can connect on the platform
            described by the teacher
          </Col>
        </Row>
      </div>
    );
  }
}

export default Teacher;
