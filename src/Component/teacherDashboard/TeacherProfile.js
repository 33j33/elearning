import React, { Component } from "react";
import { Input } from "antd";
import { Row, Col } from "antd";

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

    return (
     
              <div
              
              >
                <Row>
                  <Col >
                    Asterick(*) Fields are necessary. You can save your data by
                    clicking the save button.
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <Input
                      size="large"
                      placeholder="UserName*"
                      value={this.state.username}
                      disabled
                    />
                  </Col>
                  <Col >
                    <Input size="large" placeholder="Telephone*" />
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <Input size="large" placeholder="Address*" />
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <span>Educational Details:</span>
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <Input size="large" placeholder="Qualification*" />
                  </Col>
                  <Col >
                    <Input size="large" placeholder="Languages Spoken" />
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <Input size="large" placeholder="Remarks" />
                  </Col>
                </Row>
                <Row>
                  <Col >
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
