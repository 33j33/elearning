// @desc THIS PAGE CONTAINS ALL COURSES

import React, { Component } from "react";
import { Card, Button } from "antd";
import { Row, Col } from "antd";
import { Spin } from "antd";
import "./courses.css";
import axios from "axios";
import SearchInput, { createFilter } from "react-search-input";
import { blue } from '@ant-design/colors';
const KEYS_TO_FILTERS = ["course_name", "teacher_name"];

const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
      searchTerm: "",
      loading: true,
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  end = 13;
  slicedCoursesArray = [];
  newslicedCoursesArray = [];

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  onCardClick = (i) => {
    console.log(i);
    sessionStorage.setItem("cardData", JSON.stringify(i));
    const path = `courseinfo`;
    this.props.history.push(path);
  };

  loadMoreCourses = () => {
    this.end = this.end + 1;
    this.newslicedCoursesArray = this.slicedCoursesArray.slice(0, this.end);
    this.setState({ coursesArray: this.newslicedCoursesArray });
  };

  componentDidMount = () => {
    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        console.log(response.data);
        this.slicedCoursesArray = response.data;

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
                  placeholder="Search for a course"
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
                  hoverable
                  style={{
                    width: 240,
                    height: 150,
                    minWidth: 100,
                    marginBottom: 40,
                    backgroundColor: "blue"
                  }}
                  onClick={() => this.onCardClick(i)}
                >
                  <p>{i.course_name}</p>
                  <Meta
                    title={i.teacher_name}
                    description={i.full_course_price}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Row justify="center">
            <Button onClick={this.loadMoreCourses}>Load More</Button>
          </Row>
        </Spin>
      </div>
    );
  }
}

export default courses;
