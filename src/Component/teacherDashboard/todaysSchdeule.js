import React, { Component } from "react";
import { Descriptions, Badge } from "antd";
import axios from "axios";
import { Spin } from "antd";

class TodaysSchdeule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseArray: [],
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
        for (const i in response.data) {
          response.data[i].date = response.data[i].date.split("T")[0];
        }
        this.setState({ courseArray: response.data,loading:false });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>
      <div>
        {this.state.courseArray.map((i,index) => (
                            <Descriptions title=              {i.course_name} key={i._id}
                            >

            <Descriptions.Item label="Student Name  ">
              {i.student_name}
            </Descriptions.Item>
            <Descriptions.Item label="Student Mobile">
              {i.student_mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Course Type">
              {i.course_type}
            </Descriptions.Item>
            <Descriptions.Item label="Schedule">
              {i.selected_course_schedule.map((i,index) => (
                <p key={index}>
                  Day:{i.day}
                  Time:{i.time}
                </p>
              ))}
            </Descriptions.Item>

            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
                              </Descriptions>

        ))}
    
      </div>
      </Spin>
    );
  }
}

export default TodaysSchdeule;
