import React, { Component } from "react";
import "./footer.css";
import { Row, Col } from "antd";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <Row justify="space-around">
          <Col span={5}> About Us</Col>
          <Col span={4}>Contact</Col>
          <Col span={4}>Third field</Col>
        </Row>
        <br />
        <br />
        <Row justify="space-around">
          <Col span={5}>
            Here we will include about us Here we will include about us Here we
            will include about us Here we will include about us Here we will
            include about us Here we will include about u
          </Col>
          <Col span={4}>For more info contact Here</Col>
          <Col span={4}>somerandomtext</Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        Copyright @blabla
      </div>
    );
  }
}

export default Footer;
