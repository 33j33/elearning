import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./Component/test";
import Homepage from "./Component/homePage";
import Teacherdashboard from './Component/teacherDashboard/dashboard'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/test" exact component={Test} />
            <Route path="/teacherDashboard" exact component={Teacherdashboard} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
