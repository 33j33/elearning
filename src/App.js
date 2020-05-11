import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Profile from "./Component/teacherDashboard/TeacherProfile";
import TeacherDashboard from "./Component/teacherDashboard/dashboard";
import Courses from "./Component/teacherDashboard/courses";
import Payment from "./Component/teacherDashboard/payment";
import courseinfo from "./Component/courses/courseinfo";
import courses from "./Component/courses/courses";
// import {PrivateRoute} from "./Component/Privateroute/index";
import Test from "./Component/test";
import Homepage from "./Component/homepage/homepage";
import Header from "./Component/homepage/Navbar/Header";
import Footer from "./Component/homepage/footer/footer";
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/teacherDashboard"
              component={TeacherDashboard}
            />
            <Route exact path="/teachercourses" component={Courses} />
            <Route exact path="/allcourses" component={courses} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/courseinfo" component={courseinfo} />
            <Route path="/payment" exact component={Payment} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
