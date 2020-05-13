import React, { Component } from "react";
import { Descriptions, Badge } from "antd";
import axios from "axios";

class TodaysSchdeule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseArray: [],
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
        this.setState({ courseArray: response.data });
        console.log(this.state.courseArray);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <div>
        {this.state.courseArray.map((i) => (
                            <Descriptions title=              {i.course_name}
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
              {i.selected_course_schedule.map((i) => (
                <p>
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
    );
  }
}

export default TodaysSchdeule;
