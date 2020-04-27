import React, { Component } from "react";
import { Row, Col } from "antd";

class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <Row>
          <Col offset={8} span={8}>
            About Us
          </Col>
          <Row>
            <Col
              style={{ justifycontent: "center", lineHeight: 2 }}
              offset={8}
              span={9}
            >
              Here we will include about us Here we will include about us Here
              we will include about us Here we will include about us Here we
              will include about us Here we will include about us Here we will
              include about us Here we will include about us Here we will
              include about us Here we will include about us Here we will
              include about us Here we will include about us Here we will
              include about us Here we will include about us
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default About;
