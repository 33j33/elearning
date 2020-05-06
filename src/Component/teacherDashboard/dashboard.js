import React, { Component } from "react";
import { Layout, Menu ,Divider} from 'antd';
import { CalendarOutlined , FormOutlined, BookOutlined ,DollarOutlined } from '@ant-design/icons';




class dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const {  Sider } = Layout;

    return(

       
    <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={broken => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
    style={{
      overflow: 'auto',
      minHeight: '100vh',
      position: 'fixed',
      left: 0,
      marginTop: 10
    }}    >

    <Menu  mode="inline" style={{ minHeight:"100vh",overflow:"hidden" }} defaultSelectedKeys="1"  theme="dark">
    <Menu.Item disabled>
        <span className="nav-text">Teacher Username</span>
      </Menu.Item>      
      <Menu.Item key="1" >
      <FormOutlined />
       <span className="nav-text">Profile</span> 
      </Menu.Item>   
    
      <Menu.Item key="3">
        <BookOutlined  />
        <span className="nav-text">Courses</span>
      </Menu.Item>
      <Menu.Item key="4">
        <CalendarOutlined  />
        <span className="nav-text">Calender</span>
      </Menu.Item>
      
      <Menu.Item key="5">
      <DollarOutlined />      
        <span className="nav-text">Payment</span>
      </Menu.Item>
      <Divider />
      <Menu.Item >
        <span className="nav-text">Sign Out</span>
      </Menu.Item> 
 
    
    <br />
    </Menu>
  </Sider>
     
    
    )
    }
}

export default dashboard;