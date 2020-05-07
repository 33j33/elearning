import React, { Component } from "react";

import {BrowserRouter as Router , Switch, Route,Link} from 'react-router-dom'
import Test from "./Component/test";
import Homepage from "./Component/homePage";
import Courses from "./Component/courses/courses";

import Teacherdashboard from "./Component/teacherDashboard/dashboard";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Route path="/" exact component={Homepage} />
            <Route path="/test" exact component={Test} />
            <Route path="/teacherDashboard" exact component={Teacherdashboard} />

            <Route path="/courses" exact component={Courses} />
            <Route
              path="/teacherDashboard"
              exact
              component={Teacherdashboard}
            />
        </Router>
      </div>
    );
  }
}

export default App;
