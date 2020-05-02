import React, {
  Component,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Modal } from "antd";
import { Tabs, Select } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Form, Input, Button } from "antd";
// import { TimePicker } from "antd";
import { Table, Popconfirm } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;
const EditableContext = React.createContext();

// const format = "HH:mm";
// const { RangePicker } = TimePicker;
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Select ref={inputRef} onBlur={save}>
          <Select.Option value="Monday">Monday</Select.Option>
          <Select.Option value="Tuesday">Tuesday</Select.Option>
          <Select.Option value="Wednesday">Wednesday</Select.Option>
          <Select.Option value="Thursday">Thursday</Select.Option>
          <Select.Option value="Friday">Friday</Select.Option>
          <Select.Option value="Saturday">Saturday</Select.Option>
          <Select.Option value="Sunday">Sunday</Select.Option>
        </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class Teacherregistration extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        dataIndex: "day",
        title: "Day",
        editable: true,
      },
      {
        title: "Time",
        dataIndex: "time",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      visible: false,
      confirmLoading: false,
      t: [],
      days: "",
      dataSource: [
        {
          key: "0",
          day: "Select Day",
          time: "Select Time",
        },
      ],
      count: 1,
    };
    this.showModal = this.showModal.bind(this);
    this.selectedDay = this.selectedDay.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClicked = this.onClicked.bind(this);
  }
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      day: `Select Day`,
      time: `Select Time`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    console.log(this.state.dataSource);
  };
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
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  selected_time = [];

  onChange(time) {
    for (var i in time) {
      const hours = time[i]._d.getHours();
      const minutes = time[i]._d.getMinutes();
      console.log(hours + ":" + minutes);
      const finalTime = hours + ":" + minutes;
      this.selected_time.push(finalTime);

      this.setState({ t: this.selected_time });
    }
    console.log(this.selected_time);
  }
  selectedDay(e) {
    console.log(e);
    this.setState({ days: e });
  }

  final_selectedtime = [];
  onClicked() {
    this.selected_time = [];

    var courseSchedule = {
      courseDay: this.state.days,
      courseTime: this.state.t,
    };
    this.final_selectedtime.push(courseSchedule);
    console.log(this.final_selectedtime);
  }
  // function for time picker
  children = [];
  children2 = [];

  handleChange(value) {
    console.log(`selected ${value}`);
  }
  componentDidMount() {
    for (let i = 8; i < 22; i = i + 1) {
      let j = i + 3 / 10;
      this.children.push(
        <Option key={i.toString(36) + j}>{i + "-" + (i + 1)}</Option>
      );
      this.children.push(
        <Option key={i.toString(36) + i}>{j + "-" + (j + 1)}</Option>
      );
    }
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
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Modal
          width={600}
          style={{ top: 20 }}
          //   title="Title"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[]}
        >
          {/* <Row> */}
          <Tabs defaultActiveKey="1">
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
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Form.Item>
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
                size="medium"
              >
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="username" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: "Please input your mobile!",
                        },
                      ]}
                    >
                      <Input placeholder="mobile" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input placeholder="email" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input placeholder="password" />
                    </Form.Item>
                  </Col>
                </Row>
                {/* <Divider /> */}
                Add Course Details
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="course_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your course_name!",
                        },
                      ]}
                    >
                      <Input placeholder="course_name" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="course_price"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input your course_price!sdjfsdhfhsdfhsdhfdhdfhhdfhdfhdf",
                        },
                      ]}
                    >
                      <Input placeholder="course_price" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={11}>
                    <Form.Item
                      name="course_duration"
                      rules={[
                        {
                          required: true,
                          message: "Please input your course_duration!",
                        },
                      ]}
                    >
                      <Input placeholder="course_duration" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="description_of_course"
                      rules={[
                        {
                          required: true,
                          message: "Please input your description_of_course!",
                        },
                      ]}
                    >
                      <Input placeholder="description_of_course" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>Course Schdedule</Row>
                <Button
                  onClick={this.handleAdd}
                  type="primary"
                  style={{
                    marginBottom: 16,
                  }}
                >
                  Add a row
                </Button>
                <Row>
                  <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                  />
                  {/* <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col>
                  <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col>
                  <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col>
                  <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col>
                  <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col>

                  <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col>
                  <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col>
                  <Col span={11}>
                    <Select
                      placeholder="Select Day"
                      onChange={this.selectedDay}
                      style={{ width: "100%" }}
                    >
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
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please select Ur timeslots"
                      onChange={this.handleChange}
                    >
                      {this.children}
                    </Select>
                  </Col> */}
                </Row>
                <br />
                <Button onClick={this.onClicked}>Add</Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>{" "}
            </TabPane>
          </Tabs>
          {/* </Row> */}
        </Modal>
      </div>
    );
  }
}

export default Teacherregistration;
