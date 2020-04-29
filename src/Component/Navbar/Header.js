import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

class header extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
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
              <Nav.Link href="#deets">About Us</Nav.Link>
              <Nav.Link href="#deets">Courses</Nav.Link>
              <Nav.Link href="#deets">Sign Up For Teachers</Nav.Link>

              <Nav.Link href="#memes" onClick={this.showModal}>
                Sign Up For Students
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

       
      </div>
    );
  }
}
export default header;
