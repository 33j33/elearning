import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./Component/test";
import Homepage from "./Component/homePage";
import courseinfo from "./Component/courseinfo";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/test" exact component={Test} />
            <Route path="/courseinfo" exact component={courseinfo} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
