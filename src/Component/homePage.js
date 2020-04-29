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
        <Teacher />
        <About />
      </div>
    );
  }
}

export default Homepage;
