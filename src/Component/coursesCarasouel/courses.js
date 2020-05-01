import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import AliceCarousel from "react-alice-carousel";
import { BookOutlined } from "@ant-design/icons";
import "./courses.css";
const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryItems: this.items.map((i) => (
        <Row style={{ marginLeft: 12 }}>
          <Col span={23}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <h6>Price:xxx</h6>,
                <BookOutlined key="ellipsis" style={{ fontSize: 20 }} />,
              ]}
            >
              <Meta style={{ fontSize: "16px" }} description="Course Name" />
            </Card>
          </Col>
        </Row>
      )),
    };
  }

  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  responsive = {
    0: { items: 1 },
    1024: { items: 5 },
  };

  render() {
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
                  <input type="text" placeholder="Search " />
                </form>
              </div>
            </Col>
          </Row>
        </div>
        <br />
        <Row>
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
