import React, { Component } from "react";
import "./footer.css";
import { Row, Col, Divider } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <Row justify="space-around">
          <Col span={5}>
            <br />
            <h4>About Us</h4>
          </Col>
          <Col span={4}>
            <br />
            <h4>Contact</h4>
          </Col>
          <Col span={4}>
            <br />
            <h4>Follow Us</h4>
          </Col>
        </Row>
        <br />
        <br />
        <Row justify="space-around">
          <Col span={5} style={{ justifyContent: "center" }}>
            TurnSkill 1 to 1 is trusted Learning Network. Students, parents and
            professionals can compare multiple Tutors, Trainers and Institutes
            and choose the ones that best suit their requirements.
          </Col>
          <Col span={4}>
            Address: New Delhi, India
            <br />
            Email: info@turnskill.com
            <br />
            Phone: +919967492684
          </Col>
          <Col span={4}>
            Facebook
            <br />
            Twitter
            <br />
            Instagram
          </Col>
        </Row>
        <Divider></Divider>
        Copyright @ All rights reserved
        <br />
        <br />
      </div>
    );
  }
}

export default Footer;
