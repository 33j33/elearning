import React, { Component } from "react";
import Header from "../Navbar/Header";
import { Row, Col } from "antd";
import AliceCarousel from "react-alice-carousel";
import { Card } from "antd";

class courses extends Component {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  state = {
    galleryItems: this.items.map((i) => (
      <Row style={{ marginLeft: 12 }}>
        {" "}
        <Col span={23}>
          {" "}
          <Card
            title="Course Name"
            style={{ height: 200 }}
            extra={<a href="#">More</a>}
            key={i}
          >
            Teacher Name, duration , fees
          </Card>
        </Col>
      </Row>
    )),
  };

  responsive = {
    0: { items: 1 },
    1024: { items: 5 },
  };

  render() {
    return (
      <div>
        <Row className="row-search">
          <Col span={10}>
            <div className="search">
              <form className="search-form">
                <input type="text" placeholder="Search " />
                {/* <input type="submit" value="Submit" /> */}
              </form>
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row>
          <h5 style={{ marginLeft: "15px" }}> COURSES</h5>
          <br />
          <br />
          <AliceCarousel
            items={this.state.galleryItems}
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

export default courses;
