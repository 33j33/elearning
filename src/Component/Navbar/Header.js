import React, { Component } from "react";
import { Row, Col } from "antd";
import { Nav, Navbar } from "react-bootstrap";

import "./Header.css";

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
            {/* <Navbar>
  <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      Signed in as: <a href="#login">Mark Otto</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar> */}
            {/* <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
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

        {/* <div style={{ background: "grey" }}> */}
        <br />
        <br />
        <br />
        <Row className="heading">
          <h5>WHAT ARE YOU LOOKING FOR .......</h5>
        </Row>
        <br />
        <br />
        <Row className="row-search">
          <Col span={10}>
            <div class="search">
              <form class="search-form">
                <input type="text" placeholder="Search " />
                {/* <input type="submit" value="Submit" /> */}
              </form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default header;
