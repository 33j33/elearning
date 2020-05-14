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
          <Col span={5}><br/>About Us</Col>
          <Col span={4}><br/>Contact</Col>
          <Col span={4}><br/>Follow Us</Col>
        </Row>
        <br />
        <br />
        <Row justify="space-around">
          <Col span={5}>
          TurnSkill 1 to 1 is trusted Learning Network.
          Students, parents and professionals can compare multiple Tutors, Trainers and Institutes and choose the ones that best suit their requirements.
          </Col>
          <Col span={4}>Address: New Delhi, India
          <br/>Email: info@turnskill.com
          <br/>Phone: +919967492684
          </Col>
          <Col span={4}>Facebook
          <br/>Twitter
          <br/>Instagram</Col>
        </Row>
        <br />
        Copyright @ All rights reserved
      </div>
    );
  }
}

export default Footer;
