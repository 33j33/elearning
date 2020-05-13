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
    1024: { items: 5 },
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  filteredCourses = [];

  componentDidMount = () => {
    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        this.setState({
          galleryItems: response.data,
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
      <Row style={{ marginLeft: 12 }}>
        <Col span={23} key={i._id}>
          <Card
            hoverable
            onClick={() => this.onCardClick(i)}
            // style={{ height: "180px", maxWidth: "300px" }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                // height="150px"
              />
            }
            actions={[<h6>Price:{i.full_course_price}</h6>]}
          >
            <Meta
              // style={{ fontSize: "16px" }}
              description={i.course_name}
            />
          </Card>
        </Col>
      </Row>
    ));
    
    return (
      <div>
        {this.state.loader ? (
          <div className="example">
            <Spin />
          </div>
        ) : (
          <div>
            <div
              style={{
                backgroundColor: "whitesmoke",
                paddingTop: 80,
                paddingBottom: 80,
              }}
            >
              <Row className="heading">
                <h5>WHAT ARE YOU LOOKING FOR .......</h5>
              </Row>
              <br />
              <Row className="row-search">
                <Col span={10}>
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
            <br />
            <Row justify="space-between">
              <Col style={{ marginLeft: 12 }}>
                <h3>
                  <b>Courses</b>
                </h3>
              </Col>
              <Col style={{ marginRight: 12 }}>
                <Button>
                  <Link to="allcourses">View All</Link>
                </Button>
              </Col>
            </Row>

            <Row>
              <AliceCarousel
                //style={{ marginLeft: 0, marginRight: 0 }}
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
            <Teacher />
          </div>
        )}
      </div>
    );
  }
}

export default courses;
