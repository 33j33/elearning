import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import TeacherRegistration from "../Regis-Signin-Teacher/teacherregistration";
import { Modal } from "antd";
import { Tabs } from "antd";
import RegistrationForm from "../regisForm";
import LoginForm from "../LoginForm";
// import "./Header.css";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  teacherModalRef = ({ showModal }) => {
    this.showTeacherModal = showModal;
  };
  showModalForTeachers = () => {
    this.showTeacherModal();
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
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
          <Navbar.Brand>e-Learning Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link>About Us</Nav.Link>
              <Nav.Link>All Courses</Nav.Link>
              <Nav.Link onClick={this.showModalForTeachers}>
                For Teachers
              </Nav.Link>
              <Nav.Link onClick={this.showModal}>For Students</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <TeacherRegistration ref={this.teacherModalRef} />

        <Modal
          // mask={false}
          width={600}
          style={{ top: 20 }}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Sign In" key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <RegistrationForm />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}
export default header;
