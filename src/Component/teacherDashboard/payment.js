import React, { Component } from "react";
import { Table, Tag } from "antd";
import "./payment.css";
import Sidenav from './dashboard'
import { Row, Col, Divider, Card, Layout } from 'antd';

//Payment section of the Teacher Dashboard

//This has components

/* Coded By: yash Khanna 
THis is a Js File for the table of Payments received by teacher uptill now
Things created are as follows :-
1.  A constructor
2.  An object type columns is there with types as s.no,name,course,date,Amount Received,Mobile Number
3.  An object type of data which further connects with coulms for the data
4.  An external feature of page change is also added in case data for a single page increases

To access it :http://localhost:3000/teacherDashboard/payment
*/

class payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
    };
  }

  render() {
    const { Content } = Layout;

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

    return (
      <Layout >
      <Layout style={{ minHeight: '100vh'}}>
        <Sidenav />
        <Layout className="site-layout" style={{ marginLeft: 200, minHeight: "100vh" }}>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <h1 id="hello">Payments</h1>
        <br />
        <h5 id="hello">Payments Received From Students!</h5>
        <br />
        <Table columns={columns} dataSource={data} />
        </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default payment;