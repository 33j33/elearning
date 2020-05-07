import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { Input } from 'antd';
import { PageHeader } from 'antd';
import Sidenav from './dashboard'
import { Row, Col, Divider, Card, Layout } from 'antd';

/*Code by Tavishi, used http://localhost:3000/teacherDashboard/Teacherprofile to access it*/

class TeacherProfile extends Component {

  render() {
    const { Content } = Layout;

    return (
      <Layout >
        <Layout style={{ minHeight: '100vh'}}>
          <Sidenav />
          <Layout className="site-layout" style={{ marginLeft: 200, minHeight: "100vh" }}>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <PageHeader
                  className="site-page-header"
                  onBack={() => null}
                  title="Profile Information"
                  subTitle=""
                />
                <Descriptions title="" bordered>
                  <Descriptions.Item label="Name" span={2}><Input placeholder="Radhika Kumar" /></Descriptions.Item>
                  <Descriptions.Item label="Telephone" span={2}><Input placeholder="9953421678" /></Descriptions.Item>
                  <Descriptions.Item label="Address" span={2}><Input placeholder="New Delhi, India" /></Descriptions.Item>
                  <Descriptions.Item label="Qualification" span={2}><Input placeholder="Post Graduation" /></Descriptions.Item>
                  <Descriptions.Item label="Educational Qualification" span={2}><Input placeholder="Math teacher at DAV" /></Descriptions.Item>
                  <Descriptions.Item label="Languages Spoken" span={2}><Input placeholder="Hindi,English" /></Descriptions.Item>
                  <Descriptions.Item label="Remarks" span={2}><Input placeholder="Tell us more about you..." /></Descriptions.Item>
                </Descriptions>


              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>


    );
  }
}

export default TeacherProfile;
