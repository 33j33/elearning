import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./Component/test";
import Homepage from "./Component/homePage";
import Profile from "./Component/teacherDashboard/TeacherProfile";
/*Code by Tavishi, used http://localhost:3000/teacherDashboard/Teacherprofile to access it*/

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/test" exact component={Test} />
            <Route path="/teacherDashboard/TeacherProfile" exact component={Profile}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
