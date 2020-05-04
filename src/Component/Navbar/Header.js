import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import TeacherRegistration from "../Regis-Signin-Modal/teacherregistration";
import StudentModal from "../Regis-Signin-Modal/studentModal";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  teacherModalRef = ({ showModal }) => {
    this.showTeacherModal = showModal;
  };
  studentModalRef = ({ showSModal }) => {
    this.showStudentsModal = showSModal;
  };
  showModalForTeachers = () => {
    this.showTeacherModal();
  };

  showModalForStudents = () => {
    this.showStudentsModal();
  };

  render() {
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
              <Nav.Link onClick={this.showModalForStudents}>
                For Students
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <TeacherRegistration ref={this.teacherModalRef} />
        <StudentModal ref={this.studentModalRef} />
      </div>
    );
  }
}
export default header;
