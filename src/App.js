import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./Component/test";
import Homepage from "./Component/homePage";
class App extends Component {
  render() {
    return (
      <div>
        {/* <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="link">Link</Button>
    ALWAYS CREATE CLASS ComponentS */}
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/test" exact component={Test} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
