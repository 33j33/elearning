import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import TeacherRegistration from "../Regis-Signin-Modal/teacherregistration";
import StudentModal from "../Regis-Signin-Modal/studentModal";
import { withRouter } from "react-router-dom";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  gotocourses = () => {
    this.props.history.push("/AllCourses");
  };
  teacherModalRef = ({ obj2 }) => {
    this.showTeacherModal = obj2 && obj2.showModal;
  };
  studentModalRef = ({ obj }) => {
    this.showStudentsModal = obj && obj.showSModal;
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>TURNSKILL 1 to 1</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link>About Us</Nav.Link>
              <Nav.Link onClick={this.gotocourses}>All Courses</Nav.Link>
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
export default withRouter(header);
