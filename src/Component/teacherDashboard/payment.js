import React, { Component } from "react";
import { Table } from "antd";
import "./payment.css";
import axios from "axios";
import { Spin } from "antd";

//Payment section of the Teacher Dashboard

class payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      coursesArray: [],
      loading:true

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
        console.log(response);
        for (const i in response.data) {
          response.data[i].date = response.data[i].date.split("T")[0];
        }

        this.setState({ coursesArray: response.data,      loading:false        });
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
      },
      {
        title: "Course",
        dataIndex: "course_name",
        key: "course_name",
      },
      {
        title: "Course Type",
        dataIndex: "course_type",
        key: "course_type",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Payment",
        key: "PaymentStatus",
        dataIndex: "Remaining",
      },
    ];
    return (
      <Spin spinning={this.state.loading}>
        <Table
        key={this.state.coursesArray.course_id}
          columns={columns}
          dataSource={this.state.coursesArray}
          size="small"
        />
      </Spin>
    );
  }
}

export default payment;
