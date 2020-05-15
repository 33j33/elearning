// @desc THIS PAGE CONTAINS ALL COURSES

import React, { Component } from "react";
import { Card, Button } from "antd";
import { Row, Col } from "antd";
import { Spin } from "antd";
import "./courses.css";
import axios from "axios";
import SearchInput, { createFilter } from "react-search-input";
import { blue } from "@ant-design/colors";
const KEYS_TO_FILTERS = ["course_name", "teacher_name"];

const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
      searchTerm: "",
      loading: true,
      AllSelctedCoursesArr:[]
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  end = 9;
  slicedCoursesArray = [];
  newslicedCoursesArray = [];

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  onCardClick = (i) => {
    sessionStorage.setItem("cardData", JSON.stringify(i));
    const path = `courseinfo`;
    this.props.history.push(path);
  };

  loadMoreCourses = () => {
    this.end = this.end + 6;
    this.newslicedCoursesArray = this.slicedCoursesArray.slice(0, this.end);
    this.setState({ coursesArray: this.newslicedCoursesArray });
  };
  AllSelctedCoursesArr=[]
  componentDidMount = () => {


    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        console.log(response);
        this.slicedCoursesArray = response.data;
         for(var i in response.data){
          //  for(var j in response.data.course_schedule){
          //  if(response.data[i].course_schedule[i].day)
        //   console.log(response.data[i].course_schedule[j].day)
        //  }
        console.log(response.data[i].course_schedule)
        }
        axios
        .get("https://elearningserver.herokuapp.com/student/AllSelectedCoursesList")
        .then((response) => {
          console.log(response.data);
          // this.AllSelctedCoursesArr=response.data
          // this.setState({AllSelctedCoursesArr:response.data})
        
        })
        .catch((error) => {
          console.log(error.response);
        });

        this.newslicedCoursesArray = this.slicedCoursesArray.slice(0, this.end);
        this.setState({ coursesArray: this.newslicedCoursesArray });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    const filteredCourses = this.state.coursesArray.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <div style={{ marginTop: "80px", minHeight: 550 }}>
        <Row>
          <Col span={7} offset={8}>
            <div className="search">
              <form className="search-form">
                <SearchInput
                  onChange={this.searchUpdated}
                  placeholder="Search"
                  id="navBarSpecial"
                  style={{ width: "100%", border: "none" }}
                />
              </form>
            </div>
          </Col>
        </Row>
        <br />
        <Spin spinning={this.state.loading}>
          <Row>
            {filteredCourses.map((i) => (
              <Col offset={2} /*span={5}*/ key={i._id}>
                <Card
                  id="card1"
                  style={{
                    width: 240,
                    height: 150,
                    minWidth: 100,
                    marginBottom: 40,
                    backgroundColor: "red",
                    background:
                      " linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
                  }}
                  hoverable
                  onClick={() => this.onCardClick(i)}
                >
                  <p id="courseName">{i.course_name}</p>
                  <Meta
                    style={{ color: "red !important" }}
                    id="courseDetails"
                    title={i.teacher_name}
                    description={i.full_course_price}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Row justify="center">
            <Button onClick={this.loadMoreCourses} danger>
              Load More
            </Button>
          </Row>
        </Spin>
      </div>
    );
  }
}

export default courses;
