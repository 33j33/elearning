import React, { Component } from "react";
import { Table } from "antd";
import "./payment.css";
import axios from "axios";

//Payment section of the Teacher Dashboard

class payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      coursesArray: [],
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    const headers = { "x-auth-token": currentUser.token };
    axios
      .get(
        `https://elearningserver.herokuapp.com/teacher/selectedCoursebyStudent/${currentUser.email}`,
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        console.log(response.data[0].date.split("T"));
        for (const i in response.data) {
          response.data[i].date = response.data[i].date.split("T")[0];
        }

        this.setState({ coursesArray: response.data });
        console.log(this.state.coursesArray);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "student_name",
        key: "student_name",
        responsive: ["sm"],
      },
      {
        title: "Course",
        dataIndex: "course_name",
        key: "course_name",
        responsive: ["sm"],
      },
      {
        title: "Course Type",
        dataIndex: "course_type",
        key: "course_type",
        responsive: ["sm"],
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        responsive: ["sm"],
      },
      {
        title: "Payment",
        key: "PaymentStatus",
        dataIndex: "Remaining",
      },
    ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.coursesArray}
          size="small"
        />
      </div>
    );
  }
}

export default payment;
