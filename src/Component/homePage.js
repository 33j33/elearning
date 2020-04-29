import React, { Component } from "react";
import Header from "./Navbar/Header";
import Teacher from "./teacher/teacher";
import Courses from "./coursesCarasouel/courses";
import About from "./AboutUs/aboutUs";
import Footer from "./footer/footer";

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
        <Footer />
      </div>
    );
  }
}

export default Homepage;
