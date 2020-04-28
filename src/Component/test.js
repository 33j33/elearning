import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { Tabs } from 'antd';


class test extends Component {

  constructor(props){
   super(props)

    this.state={
    username:"",
    visible: false 
  }
}

showModal = () => {
  this.setState({
    visible: true,
  });
};

handleOk = e => {
  console.log(e);
  this.setState({
    visible: false,
  });
};

handleCancel = e => {
  console.log(e);
  this.setState({
    visible: false,
  });
};

  click=(e)=>{
e.preventDefault();
console.log(e)
console.log(e.target.name.value)
this.setState({username:e.target.name.value})
console.log(this.state)
  }

  callback(key) {
    console.log(key);
  }

  render() {
    const { TabPane } = Tabs;

    return (
      <div>
   


              <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
              <Tabs defaultActiveKey="1" onChange={this.callback}>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>

        </Modal>
      </div>
    );
  }
}

export default test;