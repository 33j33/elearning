import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios"
import { Spin } from "antd";

class progress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enrolledCoursesArray: [],
      loading: true
    }
  }
  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    const headers = { "x-auth-token": currentUser.token };
    axios
      .get(
        `https://elearningserver.herokuapp.com/student/selectedCourse/${currentUser.studentid}`,
        { headers }
      )
      .then((response) => {
        console.log(response)
        this.setState({ loading: false })
        for (const i in response.data) {
          response.data[i].date = response.data[i].date.split("T")[0];
        }
        this.setState({ enrolledCoursesArray: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>

        <div>
          <h5 style={{ marginBottom: 20 }}>Current Bought Courses: </h5>
          {this.state.enrolledCoursesArray.map(course =>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={course.course_name}
              key={course._id}
              extra={<h5>By:{course.teacher_name} </h5>}
            >
              <p style={{ marginBottom: 0 }}>Teacher Mobile: {course.teacher_mobile}</p>
              <p style={{ marginBottom: 0 }}>Course Type: {course.course_type}</p>
              <p style={{ marginBottom: 0 }}>Course Bought date: {course.date}</p>

              <p>Course Duration: {course.course_duration}</p>
              {course.selected_course_schedule.map((j, index) => (
                <p key={index}>
                  {j.day} -- {j.time + ","}
                </p>
              ))}

            </Card>
          )}



        </div>
      </Spin>
    );
  }
}

export default progress;
