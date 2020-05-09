import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Component/homePage";
import Profile from "./Component/teacherDashboard/TeacherProfile";
import TeacherDashboard from "./Component/teacherDashboard/dashboard";
import Courses from "./Component/teacherDashboard/courses";
import Payment from "./Component/teacherDashboard/payment";
import courseinfo from "./Component/courses/courseinfo";
import AllCourses from "./Component/courses/courses";
import Test from "./Component/test";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/teacherDashboard" component={TeacherDashboard} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/allcourses" component={AllCourses} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/courseinfo" component={courseinfo} />
          <Route path="/payment" exact component={Payment} />
        </Router>
      </div>
    );
  }
}

export default App;
