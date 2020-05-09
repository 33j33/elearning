import React, { Component } from "react";
import { Avatar, Card, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
const { Meta } = Card;

class StudentDashboard extends Component {
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

    const columns = [
      {
        title: "S.no",
        dataIndex: "number",
        key: "number",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Course",
        dataIndex: "course",
        key: "course",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Amount Received",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <span>
            {tags.map((tag) => {
              let color = "green";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "Mobile Number",
        dataIndex: "mob",
        key: "mob",
        render: (text) => <a>{text}</a>,
      },
    ];

    const data = [
      {
        key: "1",
        number: 1,
        name: "Jai",
        course: "Java",
        date: "25/03/2020",
        tags: ["Rs.700"],
        mob: "9898989898",
      },
      {
        key: "2",
        number: 2,
        course: "Python",
        name: "Rajat",
        date: "25/03/2020",
        tags: ["Rs.600"],
        mob: "8989898989",
      },
      {
        key: "3",
        number: 3,
        course: "ML/Data Science",
        name: "Shalini",
        date: "25/03/2020",
        tags: ["Rs.500"],
        mob: "9711708888",
      },
      {
        key: "4",
        number: 4,
        name: "Tavishi",
        course: "Data Structures",
        date: "25/03/2020",
        tags: ["Rs.700"],
        mob: "9898989898",
      },
      {
        key: "5",
        number: 5,
        course: "Ruby",
        name: "Vikas",
        date: "25/03/2020",
        tags: ["Rs.600"],
        mob: "8989898989",
      },
      {
        key: "6",
        number: 6,
        course: "Data Science",
        name: "Yash",
        date: "25/03/2020",
        tags: ["Rs.500"],
        mob: "9711708888",
      },
    ];

    const contentList = {
      profile: <p>profile content</p>,
      progress: <p>progress content</p>,
      payment: <Table columns={columns} dataSource={data} />,
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <div style={{ marginTop: "4%" }}>
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
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentDashboard;
