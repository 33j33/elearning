import React, { Component } from "react";
import { Modal } from "antd";

class Teacherregistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visibleforTeacher,
      confirmLoading: false,
    };
    console.log(this.state);
  }
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
  componentDidMount() {
    console.log(this.props.visibleforTeacher);
    this.setState({
      visible: this.props.visibleforTeacher,
    });
  }
  render() {
    return (
      <div>
        <Modal
          //   title="Title"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          {this.props.visibleforTeacher}
          Modal works!!!!
        </Modal>
      </div>
    );
  }
}

export default Teacherregistration;
