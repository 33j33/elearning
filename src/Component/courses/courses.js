import React, { Component } from "react";
import { Card } from "antd";
// import Header from "../Navbar/Header";
import { Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./courses.css";
import axios from "axios";
import Test from "../test";

const { Meta } = Card;

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = { myarray: [] };
  }

  componentDidMount = () => {
    console.log("worked");
    axios
      .get("https://elearningserver.herokuapp.com/getallCourses")
      .then((response) => {
        console.log(response.data);

        const myarray = response.data;
        this.setState({ myarray });
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
        <Test />
        <br />
        <br />
        <Row>
          <Col span={7} offset={8}>
            <form
              className="example"
              style={{ margin: "auto", maxWidth: "500px" }}
            >
              <input type="text" placeholder="Search.." />
              <button type="submit">
                <SearchOutlined />
              </button>
            </form>
          </Col>
        </Row>
        <br />
        <Row>
          {this.state.myarray.map((i) => (
            <Col offset={1} span={5}>
              <Card
                hoverable
                style={{ width: 240, minWidth: 100, marginBottom: 40 }}
              >
                <p>{i.course_name}</p>
                <Meta title="Europe Street beat" description={i.course_price} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default courses;
