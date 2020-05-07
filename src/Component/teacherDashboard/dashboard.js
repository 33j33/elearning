import React, { Component } from "react";
import { Layout, Menu ,Divider} from 'antd';
import { CalendarOutlined , FormOutlined, BookOutlined ,DollarOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";




class dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selected:"1,2,3"
      };
      this.profile=this.profile.bind(this)
    }

    profile=() =>{
      this.setState({selected:"1"})

      this.props.history.push("/profile")
    }
    courses=()=>{
      this.props.history.push("/courses")
      this.setState({selected:"2"})

    }
    payment=()=>{
      this.props.history.push("/payment")
      this.setState({selected:"3"})

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

    <Menu  mode="inline" style={{ minHeight:"100vh",overflow:"hidden" }} defaultSelectedKeys={[this.state.selected]} theme="dark">
    <Menu.Item disabled>
        <span className="nav-text">Teacher Username</span>
      </Menu.Item>      
      <Menu.Item key="1" onClick={this.profile} >
      <span className="nav-text">Profile</span> 
      </Menu.Item>   
    
      <Menu.Item key="2" onClick={this.courses}>
        <BookOutlined  />
 <span className="nav-text">Courses</span>
      </Menu.Item>
 
      
      <Menu.Item key="3" onClick={this.payment}>
      <DollarOutlined />      
       <span className="nav-text">Payment</span>
      </Menu.Item>
      {/* <Divider /> */}
      <Menu.Item >
        <span className="nav-text">Sign Out</span>
      </Menu.Item> 
 
    
    <br />
    </Menu>
  </Sider>
     
    
    )
    }
}

export default withRouter(dashboard);
