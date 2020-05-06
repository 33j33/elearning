import React, { Component } from "react";
import Payment from "./payment";

/* Code Written By: yash Khanna 
This is the main file "dashboard.js" which links to other files like payment.js
To access Payment .js:
Please go to the link on your localhost
Link : http://localhost:3000/teacherDashboard/payment */

class dashboard extends Component {
  render() {
    return (
      <div>
        <Payment />
      </div>
    );
  }
}

export default dashboard;
