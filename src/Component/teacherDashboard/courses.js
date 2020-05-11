import React, { Component } from "react";
import {  Row, Col, Button, Typography } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
    };
  }
  componentDidMount() {
    let teacherEmail;
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log(currentUser);
    teacherEmail = currentUser.email;
    const headers = { "x-auth-token": currentUser.token };
    axios
      .get(
        `https://elearningserver.herokuapp.com/teacher/addedCourseDetails/${teacherEmail}`,
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ coursesArray: response.data });

        // this.setState({
        //   visible: false,
        // });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  showModalForTeachers = () => {
    this.showTeacherModal();
  };
  render() {

    return (
   
         <div>
                <Row justify="center">
                  <Col>
                    <div style={{ textAlign: "center" }}>
                      <h1>Courses</h1>
                      <p>View, Edit and Add courses</p>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row justify="space-around">
                  <Col>
                    <Button
                      icon={
                        <PlusCircleTwoTone
                          style={{
                            position: "absolute",
                            left: "5%",
                            top: "25%",
                          }}
                        />
                      }
                      onClick={this.showModalForTeachers}
                    >
                      <Text strong style={{ paddingLeft: "8%" }}>
                        Add Course
                      </Text>
                    </Button>
                  </Col>
                 
                </Row>
                
              </div>
           
    );
  }
}

export default Courses;
