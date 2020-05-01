import React, { Component } from "react";
import { Modal } from "antd";
import { Tabs, Select } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { TimePicker } from 'antd';
const format = 'HH:mm';
const { RangePicker } = TimePicker;
const { TabPane } = Tabs;
class Teacherregistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      t:[],
      days:""
    };
    this.showModal = this.showModal.bind(this)
    this.selectedDay=this.selectedDay.bind(this)
    this.onChange=this.onChange.bind(this)
    this.onClicked=this.onClicked.bind(this)
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  selected_time=[]
  

  onChange (time) {
      for(var i in time){
      const hours=time[i]._d.getHours()
    const minutes= time[i]._d.getMinutes()
     console.log(hours+":"+minutes)
     const finalTime=hours+":"+minutes
     this.selected_time.push(finalTime)

     this.setState({t:this.selected_time})

    }
    console.log(this.selected_time)
  }; 
  selectedDay(e){
    console.log(e)
    this.setState({days:e})
  }

final_selectedtime=[]
  onClicked(){
    this.selected_time=[]

    var courseSchedule={
      courseDay:this.state.days,
      courseTime:this.state.t
    }
    this.final_selectedtime.push(courseSchedule)
    console.log(this.final_selectedtime)
  }
  render() {

    const layout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 16,
      },
    };

    return (
      <div>
        <Modal
          //   title="Title"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Row span={24}>
            <Tabs defaultActiveKey="1" >
              <TabPane
                tab={
                  <span>
                    <AppleOutlined />
          Signin
        </span>
                }
                key="1"
              >
                <Form
                  {...layout}

                  name="basic"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Row justify="center">
                    <Col span={24}>
                      <Form.Item
                        label="Username"

                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row justify="center">
                    <Col span={24}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Form.Item >
                      <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <AndroidOutlined />
          Sign Up
        </span>
                }
                key="2"
              >
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  size="small"
                >
                  <Row justify="space-between">
                    <Col span={11}>
                      <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                      >
                        <Input placeholder="username" />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name="mobile"
                        rules={[{ required: true, message: 'Please input your mobile!' }]}
                      >
                        <Input placeholder="mobile" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="space-between">
                    <Col span={11}>
                      <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                      >
                        <Input placeholder="email" />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input placeholder="password" />
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Divider /> */}
                  <Row >
                    Add Course Details
</Row><br />
                  <Row justify="space-between">
                    <Col span={11}>
                      <Form.Item
                        name="course_name"
                        rules={[{ required: true, message: 'Please input your course_name!' }]}
                      >
                        <Input placeholder="course_name" />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name="course_price"
                        rules={[{ required: true, message: 'Please input your course_price!' }]}
                      >
                        <Input placeholder="course_price" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={11}>
                      <Form.Item
                        name="course_duration"
                        rules={[{ required: true, message: 'Please input your course_duration!' }]}
                      >
                        <Input placeholder="course_duration" />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name="description_of_course"
                        rules={[{ required: true, message: 'Please input your description_of_course!' }]}
                      >
                        <Input placeholder="description_of_course" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    Course Schdedule
                  </Row>
                  <Row justify="space-between">
                  <Col span={11}>
                        <Select placeholder="Select Day" onChange={this.selectedDay} style={{width:"100%"}}> 
                          <Select.Option value="Monday">Monday</Select.Option>
                          <Select.Option value="Tuesday">Tuesday</Select.Option>
                          <Select.Option value="Wednesday">Wednesday</Select.Option>
                          <Select.Option value="Thursday">Thursday</Select.Option>
                          <Select.Option value="Friday">Friday</Select.Option>
                          <Select.Option value="Saturday">Saturday</Select.Option>
                          <Select.Option value="Sunday">Sunday</Select.Option>
                        </Select>
                    </Col>
                    <Col span={11}>
                    
                    <RangePicker format={format}  onChange={this.onChange} name="selected_time" minuteStep={15}/>
                    </Col>
                  </Row>
                  
                  <br />
                  <Button onClick={this.onClicked}>Add</Button>
            
                  <Form.Item >
                    <Button type="primary" htmlType="submit">
                      Submit
  </Button>
                  </Form.Item>
                </Form>    </TabPane>
            </Tabs>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Teacherregistration;
