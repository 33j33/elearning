import React, { Component } from "react";
import { Avatar, Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Addedcourses from './courses';
import Payment from './payment';
import Profile from './TeacherProfile';

const { Meta } = Card;


class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleKey: "todaysSchedule",
    };
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    const tabList = [
      {
        key: "todaysSchedule",
        tab: "todaysSchedule",
      },
      {
        key: "profile",
        tab: "profile",
      },
      {
        key: "adddedCourses",
        tab: "adddedCourses",
      },
      {
        key: "payment",
        tab: "payment",
      },
    ];

  
    const contentList = {
      profile: <Profile />,
      adddedCourses: <Addedcourses />,
      todaysSchedule: <p>Today schedule</p>,
      payment: <Payment />
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
              <p style={{ fontSize: "200%", textAlign: "Center" }}>John Doe</p>
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
                description="john@xyz.com"
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

export default dashboard;
