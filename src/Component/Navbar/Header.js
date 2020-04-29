import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import TeacherRegistration from "../Regis-Signin-Teacher/teacherregistration";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleforTeacher: false,
      hide: false,
      confirmLoadingForTeacher: false,
    };
    this.showModalForTeachers = this.showModalForTeachers.bind(this);
  }

  showModalForTeachers = () => {
    this.setState({
      visibleforTeacher: true,
    });
    console.log(this.state);
  };
  // handleOk = () => {
  //   this.setState({
  //     confirmLoading: true,
  //   });
  //   setTimeout(() => {
  //     this.setState({
  //       visible: false,
  //       confirmLoading: false,
  //     });
  //   }, 2000);
  // };
  render() {
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
              <Nav.Link>About Us</Nav.Link>
              <Nav.Link>Courses</Nav.Link>
              <Nav.Link onClick={this.showModalForTeachers}>
                For Teachers
              </Nav.Link>

              <Nav.Link>For Students</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.state.visibleforTeacher ? (
          <TeacherRegistration
            visibleforTeacher={this.state.visibleforTeacher}
          />
        ) : null}
      </div>
    );
  }
}
export default header;
