// @desc THIS PAGE CONTAINS ALL COURSES

import React, { Component } from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import "./courses.css";
import axios from "axios";
import SearchInput, { createFilter } from "react-search-input";
const KEYS_TO_FILTERS = ["course_name", "teacher_name"];

const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArray: [],
      searchTerm: "",
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  onCardClick = (i) => {
    console.log(i);
    sessionStorage.setItem("cardData", JSON.stringify(i));
    const path = `courseinfo`;
    this.props.history.push(path);
  };

  componentDidMount = () => {
    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        console.log(response.data);

        const coursesArray = response.data;
        this.setState({ coursesArray });
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
      <div style={{ marginTop: 30 }}>
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
        <Row>
          {filteredCourses.map((i) => (
            <Col offset={1} span={5} key={i._id}>
              <Card
                hoverable
                style={{
                  width: 240,
                  minWidth: 100,
                  marginBottom: 40,
                  height: 150,
                }}
                onClick={() =>this.onCardClick(i)}
              >
                <p>{i.course_name}</p>
                <Meta title={i.teacher_name} description={i.course_price} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default courses;
