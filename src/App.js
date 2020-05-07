import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Test from "./Component/test";
import Homepage from "./Component/homePage";
import Profile from "./Component/teacherDashboard/TeacherProfile";
import TeacherDashboard from './Component/teacherDashboard/dashboard'
import Courses from "./Component/teacherDashboard/courses";
import Payment from './Component/teacherDashboard/payment'
import courseinfo from "./Component/teacherDashboard/courseinfo";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/teacherDashboard" component={TeacherDashboard} />
          <Route exact path="/courses" component={Courses} />
          <Route
            exact
            path="/payment"

            component={Payment}
          />
          <Route exact path="/courseinfo" component={courseinfo} />
        </Router>
      </div>
    );
  }
}

export default App;
