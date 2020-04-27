import React, { Component } from "react";
import Header from "./Navbar/Header";
import Teacher from "./teacher/teacher";
import Courses from "./coursesCarasouel/courses";
import About from "./AboutUs/aboutUs";

class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <Courses />
        <br />
        <br />
        <br />
        <Teacher />
        <br />
        <br />

        <br />
        <About />
      </div>
    );
  }
}

export default Homepage;
