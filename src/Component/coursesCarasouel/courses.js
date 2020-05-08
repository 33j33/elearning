import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import AliceCarousel from "react-alice-carousel";
import { BookOutlined } from "@ant-design/icons";
import axios from "axios";
import "./courses.css";
const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myarray: [],
      galleryItems: [],
      // this.state.myarray.map((i) => (
      //   <Row style={{ marginLeft: 12 }}>
      //     <Col span={23}>
      //       <Card
      //         cover={<h1>Hi</h1>}
      //         actions={[
      //           <h6>Price:xxx</h6>,
      //           <BookOutlined key="ellipsis" style={{ fontSize: 20 }} />,
      //         ]}
      //       >
      //         <Meta style={{ fontSize: "16px" }} />
      //       </Card>
      //     </Col>
      //   </Row>
      // )),
    };
  }
  couseArray = [];
  items;

  responsive = {
    0: { items: 1 },
    1024: { items: 5 },
  };

  componentDidMount = () => {
    console.log("worked");
    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        console.log(response.data);
        this.setState({ myarray: response.data });
        this.couseArray.push(response.data);
        this.setState({
          galleryItems: response.data.map((i) => (
            <Row style={{ marginLeft: 12 }}>
              <Col span={23}>
                <Card
                  style={{ height: "180px", maxWidth: "300px" }}
                  hoverable
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
                    style={{ fontSize: "16px" }}
                    description={i.course_name}
                  />
                </Card>
              </Col>
            </Row>
          )),
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
    console.log("array", this.couseArray);
    console.log("array2", this.myarray);
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
