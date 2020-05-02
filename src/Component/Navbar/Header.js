import React, { Component } from "react";
import { Row, Col } from "antd";
import { Nav, Navbar } from "react-bootstrap";

import { Modal, Button } from 'antd';
import { Tabs } from 'antd';
import RegistrationForm from "../regisForm";
import LoginForm from "../LoginForm";

import "./Header.css";

class header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const { TabPane } = Tabs;
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="#home">e-Learning Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >

            <Nav>
              <Nav.Link href="#deets">About Us</Nav.Link>
              <Nav.Link href="#deets">Courses</Nav.Link>
              <Nav.Link href="#deets">Sign Up For Teachers</Nav.Link>

              <Nav.Link href="#memes" onClick={this.showModal}>
                Sign Up For Students
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal
          title="Sign In | Sign Up"
          mask={false}
          width={800}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Sign Up" key="1">
              <RegistrationForm />

            </TabPane>
            <TabPane tab="Sign In" key="2">
              <LoginForm />
            </TabPane>
          </Tabs>
        </Modal>


        <br />
        <br />
        <br />
        <Row className="heading">
          <h5>WHAT ARE YOU LOOKING FOR .......</h5>
        </Row>


      </div>
    );
  }
}
export default header;
