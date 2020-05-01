import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import TeacherRegistration from "../Regis-Signin-Teacher/teacherregistration";


class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
visible:true
    };
  }

  teacherModalRef = ({showModal}) => {
    this.showTeacherModal = showModal;
 }
  showModalForTeachers = () => {
    this.showTeacherModal();

  };


 
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Navbar.Brand >e-Learning Market</Navbar.Brand>
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
        <TeacherRegistration ref={this.teacherModalRef} />
       {/* <Test name="sdfsdf" style={{display:"none"}}/> */}
      </div>
    );
  }
}
export default header;
