import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Test from "./Component/test";
import Homepage from "./Component/homePage";
import Profile from "./Component/teacherDashboard/TeacherProfile";
import TeacherDashboard from './Component/teacherDashboard/dashboard'
/*Code by Tavishi, used http://localhost:3000/teacherDashboard/Teacherprofile to access it*/
import Courses from "./Component/teacherDashboard/courses";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Route path="/" exact component={Homepage} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/teacherDashboard"exact component={TeacherDashboard} />
            {/* <Route path="/courses" exact component={Courses} /> */}
      
   
            <Route path="/test" exact component={Test} />
            <Route path="/courses" exact component={Courses} />
        </Router>
      </div>
    );
  }
}

export default App;
