// @desc THIS PAGE CONTAINS COURSES CARASOUEL AND TEACHERINFO COMPONENTS OF HOMEPAGE

import React, { Component } from "react";
import { Row, Col, Card, Button } from "antd";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { Spin } from "antd";
import "./homepage.css";
import SearchInput, { createFilter } from "react-search-input";
import Teacher from "./teacher/teacher";
import { Link } from "react-router-dom";

const KEYS_TO_FILTERS = ["course_name"];

const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryItems: [],
      searchTerm: "",
      loader: true,
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  items;

  responsive = {
    0: { items: 1 },
    700: { items: 2 },
    1024: { items: 3 },
    1200: { items: 5 },
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  filteredCourses = [];
  allCoursesArray = [];
  componentDidMount = () => {
    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        this.allCoursesArray = response.data;

        axios
          .get(
            "https://elearningserver.herokuapp.com/student/AllSelectedCoursesList"
          )
          .then((res) => {
            console.log(res.data);
            this.setState({ loader: false });
            var SelectedCoursesArr = [];
            SelectedCoursesArr = res.data;

            for (var i in this.allCoursesArray) {
              for (var j in SelectedCoursesArr) {
                if (
                  this.allCoursesArray[i].course_name ===
                  SelectedCoursesArr[j].course_name
                ) {
                  for (var k in this.allCoursesArray[i].course_schedule) {
                    if (
                      this.allCoursesArray[i].course_schedule[k].day ===
                      SelectedCoursesArr[j].selected_course_schedule[k].day
                    ) {
                      for (var l in this.allCoursesArray[i].course_schedule[k]
                        .time)
                        if (
                          SelectedCoursesArr[j].selected_course_schedule[k]
                            .time ===
                          this.allCoursesArray[i].course_schedule[k].time[l]
                        ) {
                          this.allCoursesArray[i].course_schedule[
                            k
                          ].time.splice(l, 1);
                        }
                    }
                  }
                }
              }
            }
          })

          .catch((error) => {
            console.log(error);
          });

        this.setState({
          galleryItems: this.allCoursesArray,
          loader: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onCardClick = (i) => {
    sessionStorage.setItem("cardData", JSON.stringify(i));
    const path = `courseinfo`;
    this.props.history.push(path);
  };

  render() {
    this.filteredCourses = this.state.galleryItems.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    const arr = this.filteredCourses.map((i) => (
      <Row>
        <Col span={20} key={i._id}>
          <Card
            hoverable
            onClick={() => this.onCardClick(i)}
            cover={
              <img style={{ width: "2% !important" }} src="logo1.png" alt="" />
            }
            style={{
              backgroundColor: "#D3D3D3",
              minHeight: "100%",
              color: "white",
              width: 300,
            }}
            actions={[<h6>Price:{i.full_course_price}</h6>]}
          >
            <Meta
              style={{
                fontSize: "16px",
                height: 100,
                fontWeight: 900,
                color: "#c64572 !important",
                width: 50,
              }}
              description={i.course_name}
            />
          </Card>
        </Col>
      </Row>
    ));

    return (
      <div>
        <div
          style={{
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <div className="bg-image">
            <div className="overlay"></div>
            <div className="content">
              <Row className="heading">
                <h2>We Help you to tune your skill</h2>
              </Row>
              <br />
              <Row className="row-search">
                <Col span={12}>
                  <div className="search">
                    <form className="search-form">
                      <SearchInput
                        onChange={this.searchUpdated}
                        placeholder="Search for a course"
                        id="navBar"
                        style={{ width: "100%", border: "none" }}
                      />
                    </form>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <br />
        <div>
          <Row justify="space-between" style={{ marginTop: 2 }}>
            <Col>
              <h3
                style={{
                  color: "rgb(0,0,0.45)",
                  fontSize: "40px",
                  marginLeft: "20px",
                }}
              >
                Courses
              </h3>
            </Col>
            <Col style={{ marginRight: "20px" }}>
              <Button>
                <Link to="allcourses">View All</Link>
              </Button>
            </Col>
          </Row>
          {this.state.loader ? (
            <div className="example">
              <Spin spinning={this.state.loader}></Spin>
            </div>
          ) : (
              <Row style={{ marginBottom: 30 }}>
                <AliceCarousel
                  items={arr}
                  responsive={this.responsive}
                  autoPlayInterval={3000}
                  autoPlayDirection="ltr"
                  autoPlay={true}
                  fadeOutAnimation={true}
                  mouseTrackingEnabled={true}
                  buttonsDisabled={true}
                />
              </Row>
            )}
          <Teacher />
        </div>
      </div>
    );
  }
}

export default courses;
