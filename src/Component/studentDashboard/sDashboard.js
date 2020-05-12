import React, { Component } from "react";
import { Avatar, Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Profile from "./StudentProfile";
import Progress from "./Progress";
import Payment from './payment'
const { Meta } = Card;

/*
    Coded : By yash Khanna
    Problem : The Page has 2 procards then in cards there is a table .To check if we can make it more responsive
    To access : http://localhost:3000/studentDashboard
*/

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleKey: "profile",
      username:"",
      email:""
    };
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    this.setState({
      username: currentUser.username,
      email: currentUser.email    });
  }

  render() {
    const tabList = [
      {
        key: "profile",
        tab: "profile",
      },
      {
        key: "progress",
        tab: "progress",
      },
      {
        key: "payment",
        tab: "payment",
      },
    ];

 

   
    const contentList = {
      profile: <Profile />,
      progress: <Progress />,
      payment: <Payment/>,
    };

    return (
      <div style={{ margin: "5% 7% 5%" }}>
        <Row gutter={16}>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 6 }}
            sm={{ span: 10 }}
            md={{ span: 10 }}
          >
            <Card
              style={{ width: "100%" }}
              cover={
                <Avatar
                  size={150}
                  style={{ margin: "5% auto 2%" }}
                  icon={<UserOutlined style={{ margin: "auto" }} />}
                />
              }
            >
              <p style={{ fontSize: "200%", textAlign: "Center" }}>{this.state.username}</p>
              <hr
                style={{
                  height: "2px",
                  width: "100%",
                  color: "black",
                  backgroundColor: "gray",
                }}
              />

              <Meta
                style={{ textAlign: "center" }}
                title="Email Address"
                description={this.state.email}
              />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 14 }}>
            <Card
              style={{ width: "100%" }}
              tabList={tabList}
              activeTabKey={this.state.titleKey}
              onTabChange={(key) => {
                this.onTabChange(key, "titleKey");
              }}
            >
              {contentList[this.state.titleKey]}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentDashboard;
