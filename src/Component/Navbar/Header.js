import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import TeacherRegistration from "../Regis-Signin-Modal/teacherregistration";
import StudentModal from "../Regis-Signin-Modal/studentModal";
class header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.gotocourses = this.gotocourses.bind(this);
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
  gotocourses = () => {
    this.props.history.push("/courses");
  };
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>E-Learning Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link>About Us</Nav.Link>
              <Nav.Link href="/courses">All Courses</Nav.Link>
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
