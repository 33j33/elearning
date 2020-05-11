import React, { Component } from "react";
import { Input } from "antd";
import { Row, Col } from "antd";
import Sidenav from "./dashboard";
import { Layout } from "antd";
import { Button } from "antd";

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }
  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(currentUser);
    this.setState({ username: currentUser.username });
  }
  render() {
    const { Content } = Layout;

    return (
     
              <div
              
              >
                <Row>
                  <Col span={20} offset={2} style={{ marginBottom: 30 }}>
                    Asterick(*) Fields are necessary. You can save your data by
                    clicking the save button.
                  </Col>
                </Row>
                <Row>
                  <Col span={16} offset={2} style={{ marginBottom: 30 }}>
                    <Input
                      size="large"
                      placeholder="UserName*"
                      value={this.state.username}
                      disabled
                      // prefix={<UserOutlined />}
                    />
                  </Col>
                  <Col span={4} offset={2} style={{ marginBottom: 30 }}>
                    <Input size="large" placeholder="Telephone*" />
                  </Col>
                </Row>
                <Row>
                  <Col span={10} offset={2} style={{ marginBottom: 30 }}>
                    <Input size="large" placeholder="Address*" />
                  </Col>
                </Row>
                <Row>
                  <Col span={10} offset={2} style={{ marginBottom: 30 }}>
                    <span>Educational Details:</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={10} offset={2} style={{ marginBottom: 30 }}>
                    <Input size="large" placeholder="Qualification*" />
                  </Col>
                  <Col span={10} offset={2} style={{ marginBottom: 30 }}>
                    <Input size="large" placeholder="Languages Spoken" />
                  </Col>
                </Row>
                <Row>
                  <Col span={10} offset={2} style={{ marginBottom: 30 }}>
                    <Input size="large" placeholder="Remarks" />
                  </Col>
                </Row>
                <Row>
                  <Col span={20} offset={2} style={{ marginBottom: 30 }}>
                    <Button type="primary" size="large">
                      Save
                    </Button>
                  </Col>
                </Row>
              </div>
           
    );
  }
}

export default TeacherProfile;
