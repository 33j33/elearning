import React, { Component } from 'react';
import { Input, Row, Col, Button, Typography, Collapse,Layout } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import AddCourse from "./addCourse.js";
import Sidenav from './dashboard'

const { Search } = Input;
const { Text } = Typography;
const { Panel } = Collapse;
class Courses extends Component {
    constructor(props) {
        super(props)
    }
    // teacherModalRef = ({ showModal }) => {
    //     this.showTeacherModal = showModal;
    // };
    showModalForTeachers = () => {
        this.showTeacherModal();
    };
    render() {
        const { Content } = Layout;

        return (
            <Layout >
            <Layout style={{ minHeight: '100vh'}}>
              <Sidenav />
              <Layout className="site-layout" style={{ marginLeft: 200, minHeight: "100vh" }}>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>                <AddCourse ref={this.teacherModalRef} />
                <Row justify="center">
                    <Col>
                        <div style={{ textAlign: "center" }}>
                            <h1>Courses</h1>
                            <p>View, Edit and Add courses</p>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row justify="space-around">
                    <Col >
                        <Button
                            icon={<PlusCircleTwoTone style={{ position: "absolute", left: "5%", top: "25%" }} />}
                            onClick={this.showModalForTeachers}
                        >
                            <Text strong style={{ paddingLeft: "8%" }}>Add Course</Text>
                        </Button>
                    </Col>
                    <Col >
                        <Search
                            placeholder="Search Courses"
                            onSearch={value => console.log(value)}
                            enterButton
                            style={{ width: "500px" }}
                        />
                    </Col>
                </Row>
                <br />
                <Row justify="center">
                    <Col span={20}>
                        <Collapse>
                            <Panel header="Fundamentals of Machine Learning" key="1">
                                <p>Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin velit a diam dignissim blandit. Nulla non libero orci. Morbi auctor consequat pellentesque. Phasellus sit amet quam odio. Quisque id mollis augue, nec varius ipsum. Fusce rhoncus nulla non laoreet ullamcorper. Cras lacinia sollicitudin tempus"</p>
                                <p>"Monday 8-9AM, 10-11AM, 2-3AM"</p>
                                <p>"Tuesday 9-10AM"</p>
                            </Panel>
                            <Panel header="Introduction to HTML, CSS and JavaScript" key="2">
                                <p>Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin velit a diam dignissim blandit. Nulla non libero orci. Morbi auctor consequat pellentesque. Phasellus sit amet quam odio. Quisque id mollis augue, nec varius ipsum. Fusce rhoncus nulla non laoreet ullamcorper. Cras lacinia sollicitudin tempus"</p>
                                <p>"Sunday 8-9AM, 10-11AM, "2-3AM""</p>
                                <p>"Tuesday 10-11AM"</p>
                            </Panel>
                            <Panel header="Data Structures and Algorithms in C++" key="3">
                                <p>Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin velit a diam dignissim blandit. Nulla non libero orci. Morbi auctor consequat pellentesque. Phasellus sit amet quam odio. Quisque id mollis augue, nec varius ipsum. Fusce rhoncus nulla non laoreet ullamcorper. Cras lacinia sollicitudin tempus"</p>
                                <p>"Saturday 8-9AM"</p>
                                <p> "Friday 8-9AM"</p>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
                </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>

      );
    }
}

export default Courses;