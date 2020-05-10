import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import AliceCarousel from "react-alice-carousel";
import { BookOutlined } from "@ant-design/icons";
import axios from "axios";
import "./courses.css";
import { withRouter } from "react-router-dom";
import SearchInput, { createFilter } from 'react-search-input';

const KEYS_TO_FILTERS = ['course_name']

const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myarray: [],
      galleryItems: [],
      searchTerm: ''

    };
    this.searchUpdated = this.searchUpdated.bind(this)

  }
  couseArray = [];
  items;

  responsive = {
    0: { items: 1 },
    1024: { items: 5 },
  };
  data = {}


  selectedCourse = (i) => {
    console.log(i)
    this.data = i
    this.props.history.push("/courseinfo")

  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
    console.log(this.state.galleryItems)
  }
  filteredCourses = []
  componentDidMount = () => {
    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        console.log(response.data)
        this.setState({ galleryItems: response.data })
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    this.filteredCourses = this.state.galleryItems.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    const arr = this.filteredCourses.map((i) => (
      <Row style={{ marginLeft: 12 }}>
        <Col span={23}
        >
          <Card
            hoverable
            key={i}
            onClick={() => this.selectedCourse(i)}
            // style={{ height: "180px", maxWidth: "300px" }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              // height="150px"
              />

            }
            actions={[
              <h6>Price:{i.course_price}</h6>,
              <BookOutlined key="ellipsis" style={{ fontSize: 20 }} />,
            ]}
          >
            <Meta
              // style={{ fontSize: "16px" }}
              description={i.course_name}
            />
          </Card>
        </Col>
      </Row>
    ))
    return (
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
                  <SearchInput onChange={this.searchUpdated} placeholder="Search " style={{ width: "100%", border: "none" }} />
                </form>
              </div>
            </Col>
          </Row>
        </div>
        <br />
        <Row>

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
     
      </div>
    );
  }


}

export default withRouter(courses);
