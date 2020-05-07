import React, { Component } from "react";
import { Card } from "antd";
import Header from "../Navbar/Header";
import { Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./courses.css";

const { Meta } = Card;
class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <br />
        <br />
        <Row>
          <Col span={5} offset={1}>
            <form
              className="example"
              style={{ margin: "auto", maxWidth: "300px" }}
            >
              <input type="text" placeholder="Search.." />
              <button type="submit">
                <SearchOutlined />
              </button>
            </form>
          </Col>
          <Col span={14} offset={1}>
            <Card hoverable style={{ width: 240 }}>
              <p>Crd Conent</p>
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Row>
        {/* <Row className="row-search">
          <Col span={10}>
            <div classname="searchbar">
              <form className="search-form">
                <input type="text" placeholder="Search " />
              </form>
            </div>
          </Col>

          <Card hoverable style={{ width: 240 }}>
            <p>Crd Conent</p>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Row> */}
      </div>
    );
  }
}

export default courses;
