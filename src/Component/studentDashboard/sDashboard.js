import React, { Component } from "react";
import { Avatar, Card, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Progress from "../studentDashboard/progress"
const { Meta } = Card;



class StudentDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleKey: 'profile',
        };

    }


    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {

        const tabList = [
            {
                key: 'profile',
                tab: 'profile',
            },
            {
                key: 'progress',
                tab: 'progress',
            },
            {
                key: 'payment',
                tab: 'payment',
            },
        ];

        const contentList = {
            profile: <p>profile content</p>,
            progress: <Progress/>,
            payment: <p>payment content</p>,
        };

        return (
            <div style={{ margin: "5% 7% 5%" }}>
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} lg={{ span: 6 }} sm={{ span: 10 }} md={{ span: 10 }}>
                        <Card
                            hoverable
                            style={{ width: "100%" }}
                            //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            cover={<Avatar size={150} style={{ margin: "5% auto 2%" }} icon={<UserOutlined style={{ margin: "auto" }} />} />}
                        >
                            <p style={{ fontSize: "200%", textAlign: "Center" }}>John Doe</p>
                            <hr style={{ height: "2px", width: "100%", color: "black", backgroundColor: "gray" }} />

                            <Meta
                                style={{ textAlign: "center" }}
                                title="Email Address" description="john@xyz.com"
                            />
                        </Card>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <div style={{ marginTop: "4%" }}>
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                tabList={tabList}
                                activeTabKey={this.state.titleKey}
                                onTabChange={key => {
                                    this.onTabChange(key, 'titleKey');
                                }}
                            >
                                {contentList[this.state.titleKey]}
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    };
}

export default StudentDashboard;