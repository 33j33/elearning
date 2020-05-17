import React, { Component } from "react";
import { Descriptions, Button } from "antd";
import axios from "axios";
import { Spin } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

class TodaysSchdeule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseArray: [],
      loading: true,
      selected: true,
      showdiv: false,
      showbutton: true,
      show: true,
    };
  }

  coursestatus = (i) => {
    console.log("done", i);

    // this.setState({ showbutton: false });
  };
  confirm(i) {
    console.log(i);
    const databody = {
      student_id: i.student_id,
      course_id: i.course_id,
      teacher_email: i.teacher_email,
    };
    console.log(databody);
    axios
      .post(
        "https://elearningserver.herokuapp.com/teacher/completeselectedcourse",
        databody
      )
      .then((response) => {
        console.log(response);

        this.setState({
          show: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cancel(e) {
    console.log(e);
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
        for (const i in response.data) {
          response.data[i].date = response.data[i].date.split("T")[0];
        }
        this.setState({
          courseArray: response.data,
          loading: false,
          selected: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <div>
          {this.state.selected ? (
            <div>No Course selected</div>
          ) : (
            <div>
              {this.state.courseArray.map((i, index) => (
                <Descriptions title={i.course_name} key={i._id}>
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
                    {i.selected_course_schedule.map((i, index) => (
                      <p key={index}>
                        Day:{i.day}
                        Time:{i.time}
                      </p>
                    ))}
                  </Descriptions.Item>

                  <Descriptions.Item label="Status" span={3}>
                    {this.state.show ? (
                      <Popconfirm
                        title="Are you sure delete this task?"
                        onConfirm={(e) => this.confirm(i)}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          type="primary"
                          icon={<CheckOutlined />}
                          // onClick={() => this.coursestatus(i)}
                        />
                      </Popconfirm>
                    ) : (
                      <div>Course Done</div>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              ))}
            </div>
          )}
        </div>
      </Spin>
    );
  }
}

export default TodaysSchdeule;
