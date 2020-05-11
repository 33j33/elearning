import React, { Component } from "react";
import { Avatar, Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Meta } = Card;


class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleKey: "profile",
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
        key: "payment ",
        tab: "payment",
      },
    ];

  
    const contentList = {
      todaysSchedule:<p>Today classes</p>,
      profile: <p>profile content</p>,
      adddedCourses: <p>all adddedCourses content</p>,
      payment: <p>Paymenmt</p>,
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
              hoverable
              style={{ width: "100%" }}
              //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
              hoverable
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
